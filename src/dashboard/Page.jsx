import TopBar from "./components/TopBar";
import BoatsList from "./components/BoatsList";
import Map from "./components/Map";
import { Allotment } from "allotment";
import BoatInfo from "./components/BoatInfo";

export default function DashboardPage() {
  let updater = {};

  return (
    <div className="vh-100">
      <Allotment
        minSize={640}
        defaultSizes={[2, 1]}
        snap
        onChange={(sizes) => {
          if (updater.update) updater.update();
        }}
        onVisibleChange={() => {
          if (updater.update) updater.update();
        }}
      >
        <div className="h-100 d-flex flex-column">
          <TopBar />
          <Map updater={updater} />
        </div>
        <Allotment vertical snap defaultSizes={[5, 2]}>
          <div className="h-100 overflow-y-auto">
            <BoatsList className="container pt-3" />
          </div>
          <div className="h-100 overflow-y-autox  ">
            <BoatInfo />
          </div>
        </Allotment>
      </Allotment>
    </div>
  );
}
