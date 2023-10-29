"use client";

import { useState } from "react";
import FileDrop from "./components/FileDrop";
import FileList from "./components/FileList";

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <>
      <FileDrop setUploaded={setUploaded} />
      <FileList setUploaded={setUploaded} uploaded={uploaded}/>
    </>
  );
}
