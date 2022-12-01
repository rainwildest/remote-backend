import Layout from "../components/Layout";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import io from "socket.io-client";
import { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const FeedQuery = gql`
  query FeedQuery {
    feed {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`;

let socket = null;
const Post = ({ post }) => (
  <Link href="/p/[id]" as={`/p/${post.id}`} legacyBehavior>
    <a>
      <h2>{post.title}</h2>
      <small>By {post.author.name}</small>
      <p>{post.content}</p>
      <style jsx>{`
        a {
          text-decoration: none;
          color: inherit;
          padding: 2rem;
          display: block;
        }
      `}</style>
    </a>
  </Link>
);

const Blog = () => {
  const clineOnline = () => {
    socket.emit("clientOnline", "用户id");
  };

  const { loading, error, data } = useQuery(FeedQuery, {
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:3000");
    }
    document.addEventListener("visibilitychange", function () {
      const isHidden = document.hidden;
      console.log(isHidden);
      if (!isHidden) {
        clineOnline();
      }
    });

    // import * as tfvis from "@tensorflow/tfjs-vis";
  }, []);

  // const test = () => {
  //   const heights = [150, 160, 170];
  //   const weights = [40, 50, 60];

  //   const tfvis = require("@tensorflow/tfjs-vis");
  //   tfvis.render.scatterplot(
  //     { name: "身高体重训练数据" },
  //     { values: heights.map((x, i) => ({ x, y: weights[i] })) },
  //     { xAxisDomain: [140, 200], yAxisDomain: [30, 90] }
  //   );

  //   // 归一化
  //   const inputs = tf.tensor(heights).sub(150).div(20);
  //   const labels = tf.tensor(weights).sub(40).div(20);

  //   const model = tf.sequential(); // 建立模型
  //   model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  //   model.compile({
  //     loss: tf.losses.meanSquaredError, // 均方误差
  //     optimizer: tf.train.sgd(0.1) //学习率
  //   });

  //   model
  //     .fit(inputs, labels, {
  //       batchSize: 3,
  //       epochs: 200,
  //       callbacks: tfvis.show.fitCallbacks({ name: "训练过程" }, ["loss"])
  //     })
  //     .then(() => {
  //       const output = model.predict(tf.tensor([180]).sub(150).div(20));
  //       // console.log(output.mul(20).add(40).dataSync()[0]);

  //       const val = (output as tf.Tensor<tf.Rank>)
  //         .mul(20)
  //         .add(40)
  //         .dataSync()[0];

  //       console.log(`如果身高为 180，那么预测体重为 ${val}`);
  //     });

  //   // inputs.print();
  //   // labels.print();
  // };

  useEffect(() => {
    if (window) {
      // test();
    }
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <div className="relative">
        {/* <h1>My Blog</h1>
        <main>
          {data.feed.map(post => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main> */}
        <div className="w-20 h-20 border border-solid border-sky-600 absolute">
          8
        </div>
        <div className="w-20 h-20 border border-solid border-sky-600 absolute">
          8
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
