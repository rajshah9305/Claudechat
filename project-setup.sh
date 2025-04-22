# Create new Next.js project
npx create-next-app@latest claude-chat --typescript --tailwind --app --import-alias "@/*"
cd claude-chat

# Install core dependencies
npm install @vercel/ai framer-motion @prisma/client @trpc/server @trpc/client @trpc/react-query
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install @radix-ui/react-slot @radix-ui/react-toast lucide-react clsx tailwind-merge
npm install class-variance-authority puter.js axios uuid zod react-query

# Install dev dependencies
npm install -D prisma @types/uuid @types/node typescript @types/react @types/react-dom
npm install -D eslint eslint-config-next prettier prettier-plugin-tailwindcss