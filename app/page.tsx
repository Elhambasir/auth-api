export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Authentication API Documentation
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p>
          Welcome to the Authentication API! This API allows users to register,
          log in, and manage authentication securely using JWT (JSON Web
          Tokens). The API is built with Next.js API routes and Prisma ORM. You
          can access the API using the base URL below. use postman or any other
          tools to test the API. Keep in mind that you choose the method (POST)
          and the endpoint (/register, /login) to interact with the API. Or use
          (GET) to get all users.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Base URL</h2>
        <code className="block bg-gray-900 p-2 rounded">
          https://auth-gq52xayal-elhambasirs-projects.vercel.app/users
        </code>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">1. Register a New User</h2>
        <code className="block bg-gray-900 p-2 rounded">
          POST /https://auth-api-kappa-seven.vercel.app/register
        </code>
        <p>
          <strong>Description:</strong> Creates a new user account. You can use
          any tools like postman or insomnia to test the API.
        </p>
        <pre className="bg-gray-900 p-2 rounded overflow-auto">{`
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
        `}</pre>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. User Login</h2>
        <code className="block bg-gray-900 p-2 rounded">
          POST /https://auth-api-kappa-seven.vercel.app/login
        </code>
        <p>
          <strong>Description:</strong> Authenticates a user and returns a JWT
          token.
        </p>
        <pre className="bg-gray-900 p-2 rounded overflow-auto">{`
{
  "email": "john@example.com",
  "password": "securepassword"
}
        `}</pre>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Best Practices</h2>
        <ul className="list-disc ml-6">
          <li>✅ Store the JWT token securely.</li>
          <li>✅ Always send the Authorization header for protected routes.</li>
          <li>✅ Use HTTPS to protect API communication.</li>
          <li>✅ Never expose your JWT_SECRET publicly.</li>
        </ul>
      </section>

      <footer className="mt-10 text-center">
        <p>
          For support, contact{" "}
          <a href="mailto:support@your-api.com" className="text-blue-600">
            support@your-api.com
          </a>
        </p>
      </footer>
    </main>
  );
}
