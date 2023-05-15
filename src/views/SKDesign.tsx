import { Layout } from "../components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { Main } from "../pages/Main/Main";

export const SKDesign = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Layout>
  );
};
