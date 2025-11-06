import { useEffect, useState } from "react";
import "../../App.css";
import { getQueue } from "../../api-client/api";

export default function History() {
  const [queue, setQueue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const q = await getQueue();
        if (!ignore) setQueue(q);
      } catch (e) {
        console.error(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <div className="App">
        <h1>History</h1>
        <pre>{JSON.stringify(queue.data.items, null, 2)}</pre>
      </div>
    </main>
  );
}
