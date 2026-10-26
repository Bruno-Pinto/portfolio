import { dashboardMetadata, HomeDashboard } from "@/components/home-dashboard";

export const metadata = dashboardMetadata("en", true);

export default function Page() {
  return <HomeDashboard locale="en" privacy />;
}
