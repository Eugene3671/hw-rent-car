import LoaderEl from "@/compotents/ui/LoaderEl/LoaderEl";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <LoaderEl />
    </div>
  );
}
