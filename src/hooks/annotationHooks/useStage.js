import { useEffect, useState } from "react";

export function useStage(frame) {
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [lines, setLines] = useState({}); // frame -> array of lines
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState("draw"); // "draw" | "drag"

  const [selectedIds, setSelectedIds] = useState([]);
  const [selection, setSelection] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentFrameLines = lines[frame] || [];

  const setCurrentFrameLines = (updater) => {
    setLines((prev) => {
      const prevFrameLines = prev[frame] || [];
      const newFrameLines =
        typeof updater === "function" ? updater(prevFrameLines) : updater;
      return { ...prev, [frame]: newFrameLines };
    });
  };

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (mode === "draw") {
      setIsDrawing(true);
      setCurrentFrameLines((prev) => [
        ...prev,
        { points: [point.x, point.y], x: 0, y: 0, id: Date.now() },
      ]);
    } else if (mode === "drag") {
      if (e.target === stage) {
        setIsSelecting(true);
        setSelection({ x: point.x, y: point.y, w: 0, h: 0 });
      } else {
        let node = e.target;
        let clickedId = null;
        while (node && node !== stage) {
          if (
            node.attrs &&
            node.attrs.id &&
            currentFrameLines.find(
              (line) => line.id.toString() === node.attrs.id
            )
          ) {
            clickedId = node.attrs.id;
            break;
          }
          node = node.getParent();
        }
        if (!clickedId) return;

        if (e.evt.button === 2) {
          setSelectedIds((prev) => prev.filter((id) => id !== clickedId));
        } else if (e.evt.button === 0) {
          setSelectedIds((prevSelectedIds) => {
            if (!prevSelectedIds.includes(clickedId)) {
              return [...prevSelectedIds, clickedId];
            }
            return prevSelectedIds;
          });
        }
      }
    }
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (mode === "draw" && isDrawing) {
      setCurrentFrameLines((prev) => {
        const lastLine = prev[prev.length - 1];
        const newPoints = [...lastLine.points, point.x, point.y];
        const updated = [...prev];
        updated[updated.length - 1] = { ...lastLine, points: newPoints };
        return updated;
      });
    } else if (mode === "drag" && isSelecting) {
      setSelection((prev) => ({
        ...prev,
        w: point.x - prev.x,
        h: point.y - prev.y,
      }));
    }
  };

  const handleMouseUp = () => {
    if (mode === "draw") {
      setIsDrawing(false);
    } else if (mode === "drag" && isSelecting) {
      const selBox = normalizeSelection(selection);

      const foundLines = currentFrameLines.filter((line) =>
        isLineInsideBox(line, selBox)
      );

      if (foundLines.length > 0) {
        setSelectedIds((prevSelectedIds) => {
          const foundIds = foundLines.map((line) => line.id);
          const newSelection = new Set([...prevSelectedIds, ...foundIds]);
          return Array.from(newSelection);
        });
      }

      setIsSelecting(false);
      setSelection(null);
    }
  };

  const handleDragEnd = (id, pos) => {
    setCurrentFrameLines((prevLines) =>
      prevLines.map((line) =>
        line.id === id ? { ...line, x: pos.x, y: pos.y } : line
      )
    );
  };

  const normalizeSelection = (sel) => {
    const x = sel.w < 0 ? sel.x + sel.w : sel.x;
    const y = sel.h < 0 ? sel.y + sel.h : sel.y;
    const w = Math.abs(sel.w);
    const h = Math.abs(sel.h);
    return { x, y, w, h };
  };

  const isLineInsideBox = (line, sel) => {
    const xs = line.points.filter((_, i) => i % 2 === 0);
    const ys = line.points.filter((_, i) => i % 2 === 1);
    const minX = Math.min(...xs) + line.x;
    const maxX = Math.max(...xs) + line.x;
    const minY = Math.min(...ys) + line.y;
    const maxY = Math.max(...ys) + line.y;

    return (
      minX >= sel.x &&
      maxX <= sel.x + sel.w &&
      minY >= sel.y &&
      maxY <= sel.y + sel.h
    );
  };

  function getLineBBox(line) {
    if (!line || !line.points || line.points.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
    const xs = [];
    const ys = [];
    for (let i = 0; i < line.points.length; i += 2) {
      xs.push(line.points[i] + (line.x || 0));
      ys.push(line.points[i + 1] + (line.y || 0));
    }
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    const width = Math.max(...xs) - x;
    const height = Math.max(...ys) - y;
    return { x, y, width, height };
  }

  const handleDelete = (idOrIds) => {
    if (Array.isArray(idOrIds)) {
      setCurrentFrameLines((prev) =>
        prev.filter((line) => !idOrIds.includes(line.id))
      );
      setSelectedIds([]);
    } else {
      setCurrentFrameLines((prev) =>
        prev.filter((line) => line.id !== idOrIds)
      );
      setSelectedIds((prev) => prev.filter((sid) => sid !== idOrIds));
    }
  };

  const deselectId = (id) => {
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  return {
    stageSize,
    lines: currentFrameLines, // so UI still works with `lines`
    setLines: setCurrentFrameLines, // so UI still works with `setLines`
    mode,
    setMode,
    selectedIds,
    setSelectedIds,
    selection,
    isSelecting,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDragEnd,
    getLineBBox,
    handleDelete,
    deselectId,
  };
}
