// components/CustomModal.tsx
"use client";

/**
 * Render a centered modal overlay with a header and close control.
 *
 * Renders nothing when `show` is false. When visible, displays a full-screen translucent backdrop and a centered panel containing the provided `title`, a close button that calls `onClose`, and the `children` as the modal body.
 *
 * @param show - If true, the modal is rendered; otherwise returns `null`.
 * @param onClose - Callback invoked when the close button is clicked.
 * @returns The modal's React element when visible, or `null` when hidden.
 */
export default function CustomModal({
  show,
  onClose,
  title,
  children, 
}: {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}): React.JSX.Element | null {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 text-lg">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
