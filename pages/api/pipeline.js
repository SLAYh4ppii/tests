import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    let doc = await req.db.collection("pipeline").findOne();

    if (doc) {
      res.json(doc.pipeline);
    } else {
      // If the document doesn't exist, create it with default stages
      const defaultPipeline = ["Applied", "Interview", "Offer", "Rejected"];
      await req.db.collection("pipeline").insertOne({ pipeline: defaultPipeline });

      res.json(defaultPipeline);
    }
  } catch (error) {
    // Handle any other errors that may occur during the database operation.
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default handler;
