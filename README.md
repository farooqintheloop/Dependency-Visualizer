# ⚙️ Dependency Visualizer

> A blazing-fast way to visualize npm dependencies, detect vulnerabilities, and explore your project's health — all in one beautiful interface.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge&logo=github)
![Built With Love](https://img.shields.io/badge/Built%20with-%E2%9D%A4-red?style=for-the-badge)

**Created by [Muhammad Umar Farooq](https://github.com/farooqintheloop) using modern technologies and AI assistance.**

---

## 📽️ Live Demo

![Demo GIF](./demo/demo.gif)

> **Note:** Upload your package.json → Watch the dependency graph come alive → Click vulnerable nodes for security details

**🚀 [Try it Live](https://dependency-visualizer-mu.vercel.app)** *(Deploy link will be updated after Vercel deployment)*

---

## 📣 TL;DR (Too Long; Didn't Read)

Upload a `package.json` → Get a beautiful dependency graph → Spot vulnerabilities instantly.

**Built with:**
- ⚛️ **Next.js 14** + React Flow for interactive graphs
- 🧠 **TypeScript** + Prisma for type safety
- 🔐 **npm audit** integration for security scanning
- 🖼️ **Tailwind CSS** for UI polish
- 🚀 **Deployed on Vercel** for lightning-fast performance

---

## 🧠 Why This Project?

Modern JavaScript projects often rely on **100+ dependencies**. It's hard to see the bigger picture—what's critical, what's outdated, and what's vulnerable.

I built **Dependency Visualizer** because I often found myself asking:
> *"Is this package actually safe to ship?"*

Instead of reading raw audit logs or CLI output, I wanted a tool that shows everything **visually**—quickly and beautifully.

### 🎯 The Problem It Solves
- 📊 **Visual Complexity**: Turn overwhelming dependency trees into clear, interactive graphs
- 🔒 **Security Blind Spots**: Instantly identify vulnerable packages with color-coded alerts
- ⚡ **Developer Productivity**: Spend seconds, not minutes, understanding project health
- 🎨 **Beautiful UX**: Make dependency analysis actually enjoyable

---

## ✨ Features That Make It Special

### 🎨 Interactive Visualization
- **Force-directed graph layout** using React Flow
- **Zoom, pan, and click** to explore dependencies  
- **Color-coded nodes** by dependency type and vulnerability status
- **Real-time filtering** and search capabilities

### 🔒 Security Analysis
- **Vulnerability detection** via npm audit integration
- **Severity classification** (Critical, High, Medium, Low)
- **Visual indicators** for vulnerable packages
- **Detailed vulnerability information** with CVE references

### 📊 Analytics Dashboard
- **Dependency statistics** (total count, types breakdown)
- **Project health metrics** and insights
- **Export capabilities** (JSON, CSV)
- **Shareable analysis results**

---

## 🧪 Tested On

- ✅ `create-react-app` (v5+)
- ✅ `next.js` apps (v13+)
- ✅ `vite` + TypeScript projects
- ✅ Small and large-scale monorepos
- ✅ Projects with 10-500+ dependencies

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/farooqintheloop/Dependency-Visualizer.git
cd Dependency-Visualizer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the magic happen! ✨

---

## 🎯 Usage

1. **📤 Upload Package.json**: Drag and drop your `package.json` file or click to browse
2. **🎮 Try Example**: Use the "Try Example Project" button to test with sample data
3. **🔍 Explore Graph**: Use the interactive visualization to explore dependencies
4. **📋 View Details**: Click on nodes to see detailed package information
5. **🛡️ Check Security**: Review vulnerability alerts and severity levels

---

## 🏗️ Technology Stack & Architecture

### Frontend Excellence
- **Next.js 14** - Full-stack React framework with app directory
- **React Flow** - Purpose-built interactive graph visualization
- **Tailwind CSS** - Utility-first styling for rapid development
- **TypeScript** - Complete type safety and developer experience
- **Lucide React** - Modern, consistent icon library

### Backend & Data
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database toolkit
- **SQLite** - Zero-config file-based database
- **npm Registry API** - Real-time package metadata

### Development & Deployment
- **ESLint & Prettier** - Code quality and formatting
- **Vercel** - Zero-config deployment platform
- **AI-Assisted Development** - Leveraging modern AI tools for rapid iteration

---

## 📁 Project Architecture

```
src/
├── app/                    # Next.js 14 app directory
│   ├── api/               # Serverless API routes
│   │   ├── analyze/       # Core analysis endpoint
│   │   └── example/       # Demo data endpoint
│   ├── analyze/           # Main analysis dashboard
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── dependency-graph.tsx # Interactive visualization
│   └── stats-panel.tsx   # Analytics dashboard
├── lib/                  # Core business logic
│   ├── analysis-service.ts # Dependency analysis engine
│   ├── npm-service.ts    # npm registry integration
│   └── database.ts       # Database client
└── types/               # TypeScript definitions
```

---

## 🎨 Design Philosophy

### 80/20 Rule in Action
This MVP delivers **80% of the value with 20% of the effort**:

✅ **Core Value Delivered**
- Interactive dependency visualization
- Real-time vulnerability detection
- Clean, intuitive user interface
- File upload functionality
- Professional design system

⏳ **Future Enhancements**
- AI-powered replacement suggestions
- Multiple vulnerability data sources
- Team collaboration features
- Advanced filtering and search
- Performance optimizations for massive projects

### Solo Developer Excellence
- **Next.js full-stack** eliminates backend complexity
- **SQLite database** requires zero server setup
- **React Flow** provides production-ready graph components
- **Tailwind CSS** enables rapid, consistent UI development
- **Vercel deployment** offers instant, scalable hosting

---

## 📊 Example Analysis Output

```json
{
  "projectInfo": {
    "name": "my-react-app",
    "version": "1.0.0"
  },
  "stats": {
    "totalDependencies": 45,
    "vulnerabilityCount": {
      "critical": 0,
      "high": 2,
      "medium": 1,
      "low": 0
    },
    "dependencyTypes": {
      "production": 25,
      "development": 20,
      "peer": 0
    }
  }
}
```

---

## 🔧 Configuration & Customization

### Environment Variables
```env
DATABASE_URL=file:./dev.db
```

### Customization Options
- **Vulnerability Sources**: Modify `src/lib/npm-service.ts` for different security databases
- **Visual Styling**: Adjust colors in `src/components/dependency-graph.tsx`  
- **Analysis Depth**: Configure limits in `src/lib/analysis-service.ts`
- **UI Themes**: Customize Tailwind configuration for branding

---

## 🚀 Deployment

### Vercel (Recommended - Zero Config)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with one command
vercel
```

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 🤝 Contributing

This project was created by **Muhammad Umar Farooq** with AI assistance. Contributions are welcome!

### How to Contribute
1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

### Development Guidelines
- Follow the existing TypeScript patterns
- Add tests for new features
- Update documentation for API changes
- Ensure responsive design principles

---

## 👨‍💻 About the Creator

**Muhammad Umar Farooq** - A passionate full-stack developer who believes in the power of AI-assisted development and the 80/20 principle. 

This project showcases how modern tools, smart architecture decisions, and strategic use of AI can help solo developers build impressive, production-ready applications quickly.

🔗 **Connect with me:**
- **GitHub**: [@farooqintheloop](https://github.com/farooqintheloop)
- **Email**: umar57988@gmail.com

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

**Note:** While this project is open source, please respect the creator's work and provide attribution when using or referencing this code.

---

## 🎯 Roadmap

### Phase 1 (Complete ✅)
- [x] Interactive dependency visualization
- [x] npm audit security integration
- [x] Responsive dashboard interface
- [x] File upload with validation
- [x] Professional design system

### Phase 2 (In Development 🚧)
- [ ] AI-powered replacement suggestions
- [ ] GitHub repository integration
- [ ] Advanced filtering and search
- [ ] Performance optimizations for large projects
- [ ] Export to multiple formats

### Phase 3 (Future Vision 🔮)
- [ ] Team collaboration features
- [ ] CI/CD pipeline integration
- [ ] Multiple package manager support (yarn, pnpm)
- [ ] Enterprise security compliance
- [ ] Real-time monitoring dashboard

---

## 🏆 Recognition

> *"The best dependency visualizer is the one you actually use"*

Built to solve real developer problems with modern technologies and thoughtful design.

---

**🔥 Created by Muhammad Umar Farooq with ❤️ for the developer community**

[![GitHub followers](https://img.shields.io/github/followers/farooqintheloop?style=social)](https://github.com/farooqintheloop)
