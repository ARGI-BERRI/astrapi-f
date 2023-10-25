"use client";

import FileDrop from "./components/FileDrop";
import FileList from "./components/FileList";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <FileDrop />
      <FileList />
    </>
  );
}
