import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Code,
  Globe,
  Monitor,
  ArrowRight,
  ExternalLink,
  Github,
} from "lucide-react";
import NoFound from "@assets/404.jpg";

export default function Home() {
  const projects = [
    {
      id: 1,
      title: "Plataforma de E-Commerce",
      description:
        "Solución de comercio electrónico moderna con gestión de inventario y procesamiento de pagos en tiempo real.",
      type: "Aplicación web",
      status: "En desarrollo",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: NoFound,
      progress: 75,
    },
    {
      id: 2,
      title: "Sitio web corporativo",
      description:
        "Sitio web corporativo responsivo con integración CMS y optimización SEO.",
      type: "Sitio web",
      status: "Activo",
      technologies: ["React", "Tailwind CSS", "Sanity CMS"],
      image: NoFound,
      progress: 100,
    },
    {
      id: 3,
      title: "Herramienta de gestión de proyectos",
      description:
        "Aplicación de escritorio multiplataforma para colaboración en equipo y seguimiento de proyectos.",
      type: "Aplicación de escritorio",
      status: "En desarrollo",
      technologies: ["Electron", "React", "Node.js", "SQLite"],
      image: NoFound,
      progress: 60,
    },
    {
      id: 4,
      title: "Panel de análisis",
      description:
        "Panel de análisis en tiempo real con funciones de visualización de datos y generación de informes.",
      type: "Aplicación web",
      status: "Planificación",
      technologies: ["Vue.js", "D3.js", "Express", "MongoDB"],
      image: NoFound,
      progress: 25,
    },
  ];

  const services = [
    {
      icon: Globe,
      title: "Aplicaciones web",
      description:
        "Aplicaciones web full-stack con marcos modernos y arquitectura escalable.",
    },
    {
      icon: Monitor,
      title: "Sitios web",
      description:
        "Sitios web responsivos optimizados para el rendimiento, el SEO y la experiencia del usuario.",
    },
    {
      icon: Code,
      title: "Aplicaciones de escritorio",
      description:
        "Aplicaciones de escritorio multiplataforma con rendimiento nativo y interfaz de usuario moderna.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <Badge
                variant="outline"
                className="mb-6 border-gray-600 text-gray-400"
              >
                Infinity Project
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Construyendo
                <span className="text-gray-400"> Soluciones </span>
                Digitales
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Nos especializamos en la creación de aplicaciones web, sitios
                web y aplicaciones de escritorio con código limpio y diseño
                cuidado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200"
                >
                  Vea nuestro trabajo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-black hover:bg-gray-900 hover:text-white"
                >
                  Contáctanos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestros servicios
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Soluciones digitales integrales en múltiples plataformas y
                tecnologías.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gray-800 rounded-full w-fit">
                      <service.icon className="h-8 w-8 text-gray-300" />
                    </div>
                    <CardTitle className="text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-center">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Active Projects Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Proyectos activos
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Proyectos actuales en desarrollo y trabajos recientemente
                finalizados.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 group"
                >
                  <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className="border-gray-600 text-gray-400"
                      >
                        {project.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {project.type}
                      </span>
                    </div>
                    <CardTitle className="text-white group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-800 text-gray-300 border-gray-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-black hover:bg-gray-800 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Vista
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-black hover:bg-gray-800 hover:text-white"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Código
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-950 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comienza tu proyecto
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              ¿Está listo para discutir su próximo proyecto de aplicación web,
              sitio web o aplicación de escritorio?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
              >
                Empezar
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-black hover:bg-gray-900 hover:text-white"
              >
                Programar llamada
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500">© 2025 Infinity Project.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
