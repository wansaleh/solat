/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  return {
    body: { hello: 'world' },
  };
}
