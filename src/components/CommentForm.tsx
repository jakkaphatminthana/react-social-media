import type { ComponentPropsWithoutRef, FormEvent } from "react";

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

type CommentFormProps = {
  handleSubmit: (e: FormEvent) => void;
  isLoading?: boolean;
  isError?: boolean;
  buttonText?: string;
  buttonColor?: string;
  errorText?: string;
} & TextareaProps;

const CommentForm = ({
  handleSubmit,
  isLoading = false,
  isError = false,
  buttonText = "Post Comment",
  buttonColor = "bg-purple-500",
  errorText = "Error posting comment.",
  ...textareaProps
}: CommentFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={textareaProps.value}
        onChange={textareaProps.onChange}
        rows={textareaProps.rows || 3}
        placeholder={textareaProps.placeholder || "Write a comment..."}
        className="w-full border border-white/10 bg-transparent p-2 rounded"
      />
      <button
        type="submit"
        className={`mt-2 text-white px-4 py-2 rounded cursor-pointer ${buttonColor}`}
        disabled={!textareaProps.value}
      >
        {isLoading ? "Posting..." : buttonText}
      </button>

      {isError && <p className="text-red-500 mt-2">{errorText}</p>}
    </form>
  );
};

export default CommentForm;
