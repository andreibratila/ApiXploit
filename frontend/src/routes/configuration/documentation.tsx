import { createFileRoute } from "@tanstack/react-router";
import documentationData from "@/json/documentation.json";
import { BookOpen } from "lucide-react";
import { createElement } from "react";

export const Route = createFileRoute("/configuration/documentation")({
  component: DocumentationPage,
});

function DocumentationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {documentationData.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {documentationData.description}
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-16">
        {documentationData.sections.map(
          ({ id, title, description, subsections }) => (
            <section
              key={id}
              id={id}
              className="scroll-mt-16 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {title}
                </h2>
                <p className="text-lg text-gray-600 mb-8">{description}</p>

                <div className="space-y-12">
                  {subsections?.map(({ id, title, content }) => (
                    <div
                      key={id}
                      id={id}
                      className="scroll-mt-16 bg-gray-50 rounded-xl p-6"
                    >
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                        {title}
                      </h3>
                      <RenderContent content={content} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}

const RenderContent = ({ content }: { content: string | string[] }) => {
  if (!Array.isArray(content)) {
    return <p className="text-gray-600 leading-relaxed">{content}</p>;
  }

  return (
    <div className="space-y-6">
      {content.map((item, index) => {
        if (item.startsWith("```")) {
          const code = item.replace(/^```(\w+)?\n/, "").replace(/```$/, "");
          return (
            <pre
              key={index}
              className="bg-gray-50 p-6 rounded-lg overflow-x-auto font-mono text-sm text-gray-800 border border-gray-200"
            >
              <code>{code}</code>
            </pre>
          );
        }

        if (item.startsWith("#")) {
          const level = item.match(/^#+/)?.[0].length || 1;
          const text = item.replace(/^#+\s+/, "");
          const Tag = `h${Math.min(level, 4)}`;
          return createElement(
            Tag, // Esto crea dinámicamente un elemento h1, h2, h3, etc.
            {
              key: index,
              className: `text-${2 - level}xl font-bold text-gray-900 mt-4 mb-2`,
            },
            text // El contenido del encabezado
          );
        }

        if (item.startsWith("-")) {
          return (
            <ul key={index} className="list-disc pl-4 space-y-2">
              <li className="text-gray-600">{item.replace(/^- /, "")}</li>
            </ul>
          );
        }

        if (/^\d+\./.test(item)) {
          const [number, ...rest] = item.split(/\.\s+/);
          return (
            <div key={index} className="flex items-start space-x-4 pl-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                {number}
              </span>
              <p className="text-gray-600">{rest.join(". ")}</p>
            </div>
          );
        }

        if (!item.trim()) {
          return <div key={index} className="h-4" />;
        }

        return (
          <p key={index} className="text-gray-600 leading-relaxed">
            {item}
          </p>
        );
      })}
    </div>
  );
};
