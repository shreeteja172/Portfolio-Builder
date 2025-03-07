interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
  }
  
  export function Textarea({ label, error, ...props }: TextareaProps) {
    return (
      <div className="flex flex-col">
        {label && <label className="text-gray-700 dark:text-white">{label}</label>}
        <textarea
          className="px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
  