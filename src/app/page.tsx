import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HubPage } from "@/components/HubPage";

export default function HomePage() {
  return (
    <>
      <Header />
      <HubPage />
      <div className="lf-wrap" style={{ paddingTop: 0 }}>
        <Footer />
      </div>
    </>
  );
}
