import { render, screen, fireEvent } from "@testing-library/react";
import UploadSection from "../UploadSection";

global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;

describe("UploadSection", () => {
  it("renders the upload form", () => {
    render(<UploadSection />);
    expect(screen.getByText(/vehicle details & file/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/vehicle type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload file/i)).toBeInTheDocument();
  });

  it("shows an alert if file is not uploaded", () => {
    render(<UploadSection />);

    const submitButton = screen.getByText(/upload/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/please upload a file/i)).toBeInTheDocument();
  });

  it("shows an alert if required fields are missing", () => {
    render(<UploadSection />);

    const fileInput = screen.getByLabelText(/upload file/i);
    fireEvent.change(fileInput, { target: { files: [new File(["test"], "test.txt")] } });

    const submitButton = screen.getByText(/upload/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    render(<UploadSection />);

    const fileInput = screen.getByLabelText(/upload file/i);
    fireEvent.change(fileInput, { target: { files: [new File(["test"], "test.txt")] } });

    const vehicleTypeInput = screen.getByLabelText(/vehicle type/i);
    fireEvent.change(vehicleTypeInput, { target: { value: "Car" } });

    const submitButton = screen.getByText(/upload/i);
    fireEvent.click(submitButton);

    await screen.findByText(/file uploaded successfully/i);
  });
});
