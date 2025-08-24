import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilesSection from "../FilesSection";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: "1",
          lastUpdated: "2025-08-23",
          vehicle: "Car",
          registration: "ABC123",
          status: "Failed",
        },
      ]),
  })
) as jest.Mock;

describe("FilesSection", () => {
  it("renders loading state initially", () => {
    render(<FilesSection />);
    expect(screen.getByText(/loading files/i)).toBeInTheDocument();
  });

  it("renders files after fetching", async () => {
    render(<FilesSection />);

    await waitFor(() => {
      expect(screen.getByText("Car")).toBeInTheDocument();
      expect(screen.getByText("ABC123")).toBeInTheDocument();
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
  });

  it("handles retry action for failed files", async () => {
    const mockRetry = jest.fn(() => Promise.resolve({ ok: true }));
    global.fetch = jest.fn((url) => {
      if (url.includes("retry")) {
        return mockRetry();
      }
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: "1",
              lastUpdated: "2025-08-23",
              vehicle: "Car",
              registration: "ABC123",
              status: "Failed",
            },
          ]),
      });
    }) as jest.Mock;

    render(<FilesSection />);

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });

    const retryButton = screen.getByText(/retry/i);
    userEvent.click(retryButton);

    await waitFor(() => {
      expect(mockRetry).toHaveBeenCalled();
    });
  });
});
