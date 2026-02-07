import OngoingServicesTable from "./_components/OngoingServicesTable";
// import SalonGoogleMap from "./_components/SalonGoogleMap";
import StatContainer from "./_components/StatContainer";
import UpcomingBookingList from "./_components/UpcomingBookingList";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-6 space-y-4 ">
      <h1 className="text-xl font-semibold text-gray-900">Overview</h1>
      <StatContainer/>
      {/* <SalonGoogleMap coordinates={[23.7778, 90.4057]} />  */}
      <OngoingServicesTable />
      <UpcomingBookingList />
    </div>
  );
};

export default DashboardPage;
