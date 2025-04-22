# Create project directory
mkdir claude-chat-starter
cd claude-chat-starter

# Initialize Next.js project with TypeScript
npx create-next-app@latest . --typescript --tailwind --app --import-alias "@/*"

# Install required dependencies
npm install @vercel/ai framer-motion @radix-ui/react-dropdown-menu @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-toast lucide-react clsx tailwind-merge class-variance-authority puter.js axios uuid