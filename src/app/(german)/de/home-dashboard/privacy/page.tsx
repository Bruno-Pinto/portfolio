import { dashboardMetadata, HomeDashboard } from "@/components/home-dashboard";

export const metadata = dashboardMetadata("de", true);

export default function Page() {
  return <HomeDashboard locale="de" privacy />;
}
