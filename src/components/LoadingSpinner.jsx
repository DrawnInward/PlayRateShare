import { ClipLoader } from "react-spinners";

export default function LoadingSpinner({ isLoading }) {
  return (
    <div className="loading-spinner">
      <ClipLoader
        loading={isLoading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
