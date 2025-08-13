<div align="center">

# 📸 Photo Forge

**Your Complete Photography Assistant**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

*Streamline your photography workflow with AI-powered tools for photo selection, caption generation, metadata editing, and watermarking.*

[🚀 **Get Started**](#quick-start) • [📖 **Documentation**](#features) • [🎯 **Demo**](#demo) • [🤝 **Contributing**](#contributing)

</div>

---

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="25%">
        <img src="public/file.svg" alt="Photo Picker" width="60" height="60">
        <br><strong>Photo Picker</strong>
        <br>Swipe through photos to quickly find your best shots
      </td>
      <td align="center" width="25%">
        <img src="public/window.svg" alt="Caption Generator" width="60" height="60">
        <br><strong>AI Caption Generator</strong>
        <br>Generate engaging social media captions with AI
      </td>
      <td align="center" width="25%">
        <img src="public/file.svg" alt="Metadata Editor" width="60" height="60">
        <br><strong>Metadata Editor</strong>
        <br>View and edit EXIF data and keywords
      </td>
      <td align="center" width="25%">
        <img src="public/globe.svg" alt="Watermarking" width="60" height="60">
        <br><strong>Watermarking Tool</strong>
        <br>Add professional watermarks to protect your images
      </td>
    </tr>
  </table>
</div>

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key (for caption generation)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/photo-forge.git
cd photo-forge

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env.local
# Add your OpenAI API key to .env.local
```

### Environment Setup

Create a `.env.local` file in the project root:

```env
OPENAI_API_KEY=your_actual_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).

### Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Demo

> **Note:** Add screenshots or GIFs of your app in action here

## 🏗️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **AI Integration:** OpenAI GPT-4o-mini
- **Image Processing:** Sharp + Canvas API
- **Gestures:** React Swipeable
- **Metadata:** ExifR for EXIF data reading

## 🛠️ Development

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── caption-generator/ # Caption generation page
│   ├── metadata-editor/   # EXIF editing page
│   ├── photo-picker/      # Photo selection page
│   └── watermarking-tool/ # Watermark application page
├── components/            # Reusable UI components
│   ├── CaptionGenerator/  # Caption generation components
│   ├── MetadataEditor/    # EXIF editing components
│   ├── PhotoPicker/       # Photo selection components
│   └── WatermarkingTool/  # Watermark components
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── context/               # React context providers
```

### Key Features Implementation

- **Container Pattern:** Each feature uses a container component pattern for state management
- **Custom Hooks:** Business logic extracted into reusable hooks
- **Component Composition:** Small, focused components for maintainability
- **Type Safety:** Full TypeScript integration with proper type definitions

## 🔧 API Reference

### Caption Generation

```http
POST /api/generate-caption
Content-Type: multipart/form-data

image: File
maxHashtags: number (optional, default: 20)
```

Response:
```json
{
  "description": "Caption text",
  "hashtags": ["tag1", "tag2", "..."]
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [OpenAI](https://openai.com/) for AI-powered caption generation
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com/) for seamless deployment

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/your-username/photo-forge)
![GitHub issues](https://img.shields.io/github/issues/your-username/photo-forge)
![GitHub stars](https://img.shields.io/github/stars/your-username/photo-forge)
![GitHub license](https://img.shields.io/github/license/your-username/photo-forge)

---

<div align="center">

**[⬆ Back to Top](#-photo-forge)**

Made with ❤️ by photographers, for photographers

</div>
