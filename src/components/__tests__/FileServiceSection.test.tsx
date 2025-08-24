import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileServiceSection from "../FileServiceSection";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: "1",
          fileName: "test-file.txt",
          status: "Pending",
        },
      ]),
  })
) as jest.Mock;

describe("FileServiceSection", () => {
  it("renders loading state initially", () => {
    render(<FileServiceSection />);
    expect(screen.getByText(/loading file service queue/i)).toBeInTheDocument();
  });

  it("renders the file service queue after fetching", async () => {
    render(<FileServiceSection />);

    await waitFor(() => {
      expect(screen.getByText("test-file.txt")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });
  });

  it("handles cancel action for queue items", async () => {
    const mockCancel = jest.fn(() => Promise.resolve({ ok: true }));
    global.fetch = jest.fn((url) => {
      if (url.includes("cancel")) {
        return mockCancel();
      }
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: "1",
              fileName: "test-file.txt",
              status: "Pending",
            },
          ]),
      });
    }) as jest.Mock;

    render(<FileServiceSection />);

    await waitFor(() => {
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    const cancelButton = screen.getByText(/cancel/i);
    userEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockCancel).toHaveBeenCalled();
    });
  });
});
