// import Image from "next/image";
import Editor from "./texteditor/page";
// import ErrorBoundary from "./components/common/ErrorBoundary ";

export default function Home() {
  useDisableCopy();
  return (
    <>
      {/* <ErrorBoundary> */}

      <Editor />
      {/* </ErrorBoundary> */}
      {/* { resend email key :=>/* https://chatgpt.com/share/6793dd73-d7ac-800a-85af-21e9ea6c32ac */}
    </>
  );
}

