import Head from "next/head";
import type { NextPageWithLayout } from "../_app";
import { getLayout } from "src/components/layouts/MainLayout/MainLayout";

const AddClient: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Add Client</title>
      </Head>


      <main className="">
        <div className="text-center">
          <h1>Add Client</h1>
        </div>
      </main>
    </>
  );
};


AddClient.getLayout = getLayout;

export default AddClient;