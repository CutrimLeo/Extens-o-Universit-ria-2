import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, BarChart3, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">SocialHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Login</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          🚀 Projeto Inicial - MVP
        </Badge>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Gerencie suas Redes Sociais
          <br />
          <span className="text-blue-600">em um só lugar</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Plataforma integrada para automação e gerenciamento de publicações em múltiplas redes sociais. Economize tempo
          e aumente seu engajamento.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Começar Agora
          </Button>
          <Button size="lg" variant="outline">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Funcionalidades Principais</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Agendamento</CardTitle>
              <CardDescription>Agende posts para múltiplas redes sociais</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Multi-Contas</CardTitle>
              <CardDescription>Gerencie várias contas em diferentes plataformas</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Acompanhe métricas e engajamento</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-orange-600 mb-2" />
              <CardTitle>Automação</CardTitle>
              <CardDescription>Publique automaticamente no horário ideal</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Status do Projeto */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Status do Desenvolvimento</CardTitle>
            <CardDescription className="text-center">
              Projeto de Extensão Universitária - Versão Inicial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">✅ Implementado</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Estrutura base do projeto</li>
                  <li>• Interface inicial</li>
                  <li>• Design system configurado</li>
                  <li>• Componentes UI básicos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">🔄 Em Desenvolvimento</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Sistema de autenticação</li>
                  <li>• Integração com APIs sociais</li>
                  <li>• Gerenciamento de posts</li>
                  <li>• Sistema de agendamento</li>
                  <li>• Dashboard de métricas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2025 SocialHub - Projeto de Extensão Universitária</p>
          <p className="text-sm mt-2">Desenvolvido por Leonardo Cutrim de Oliveira</p>
        </div>
      </footer>
    </div>
  )
}
