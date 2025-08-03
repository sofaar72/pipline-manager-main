import UsersList from "../components/users/UsersList";
import LayoutOne from "../layout/LayoutOne";

// import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";

// import PreviewPrev from "../components/golbals/PlaceHolders.jsx/PreviewPrev";
// import PreviewPageContents from "../components/previewPage/PreviewPageContents";

const UsersPage = () => {
  return (
    <LayoutOne>
      <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
        <div className="w-full h-full">
          {/* <PreviewPrev />
          <PreviewPageContents /> */}
          <UsersList />
        </div>
      </div>
    </LayoutOne>
  );
};

export default UsersPage;
