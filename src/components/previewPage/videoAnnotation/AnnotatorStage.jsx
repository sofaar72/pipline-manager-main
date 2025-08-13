import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Image as KImage,
  Rect,
  Line,
  Text,
  Group,
} from "react-konva";
import SandboxStage from "./SandboxStage";

export default function AnnotatorStage(props) {
  return <SandboxStage {...props} />;
}
