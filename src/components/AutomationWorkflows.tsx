/**
 * AutomationWorkflows Component - Interactive workflow demonstration
 * Shows how Tintbot.ai automates various business processes
 */

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, CheckCircle, Clock, Mail, MessageSquare, Star, Calendar, Share2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface WorkflowStep {
  id: string
  title: string
  description: string
  icon: any
  delay: number
  status: 'pending' | 'active' | 'completed'
}

interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  totalDuration: number
}

export default function AutomationWorkflows() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('lead-nurture')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const workflows: Workflow[] = [
    {
      id: 'lead-nurture',
      name: 'Lead Nurturing Sequence',
      description: 'Automated follow-up for new leads',
      totalDuration: 8000,
      steps: [
        {
          id: '1',
          title: 'Lead Captured',
          description: 'Customer submits inquiry form',
          icon: CheckCircle,
          delay: 0,
          status: 'pending'
        },
        {
          id: '2',
          title: 'Instant Response',
          description: 'AI sends personalized welcome message',
          icon: MessageSquare,
          delay: 1000,
          status: 'pending'
        },
        {
          id: '3',
          title: 'Lead Qualification',
          description: 'AI asks qualifying questions',
          icon: Clock,
          delay: 2500,
          status: 'pending'
        },
        {
          id: '4',
          title: 'Pricing Information',
          description: 'Custom quote generated and sent',
          icon: Mail,
          delay: 4000,
          status: 'pending'
        },
        {
          id: '5',
          title: 'Booking Invitation',
          description: 'Calendar link shared for appointment',
          icon: Calendar,
          delay: 6000,
          status: 'pending'
        },
        {
          id: '6',
          title: 'Follow-up Schedule',
          description: 'Automated reminders set up',
          icon: CheckCircle,
          delay: 8000,
          status: 'pending'
        }
      ]
    },
    {
      id: 'review-request',
      name: 'Review Collection',
      description: 'Post-service review automation',
      totalDuration: 6000,
      steps: [
        {
          id: '1',
          title: 'Service Completed',
          description: 'Job marked as finished in system',
          icon: CheckCircle,
          delay: 0,
          status: 'pending'
        },
        {
          id: '2',
          title: 'Thank You Message',
          description: 'Personalized thank you sent to customer',
          icon: MessageSquare,
          delay: 1500,
          status: 'pending'
        },
        {
          id: '3',
          title: 'Review Request',
          description: 'Google/Yelp review link shared',
          icon: Star,
          delay: 3000,
          status: 'pending'
        },
        {
          id: '4',
          title: 'Photo Request',
          description: 'Customer asked to share photos',
          icon: Share2,
          delay: 4500,
          status: 'pending'
        },
        {
          id: '5',
          title: 'Social Media Post',
          description: 'Before/after photos posted automatically',
          icon: Share2,
          delay: 6000,
          status: 'pending'
        }
      ]
    },
    {
      id: 'appointment-reminder',
      name: 'Appointment Reminders',
      description: 'Automated booking confirmations and reminders',
      totalDuration: 7000,
      steps: [
        {
          id: '1',
          title: 'Booking Confirmed',
          description: 'Appointment scheduled in calendar',
          icon: Calendar,
          delay: 0,
          status: 'pending'
        },
        {
          id: '2',
          title: 'Confirmation Email',
          description: 'Booking details sent to customer',
          icon: Mail,
          delay: 1000,
          status: 'pending'
        },
        {
          id: '3',
          title: '24hr Reminder',
          description: 'SMS/email reminder sent day before',
          icon: Clock,
          delay: 3000,
          status: 'pending'
        },
        {
          id: '4',
          title: '2hr Reminder',
          description: 'Final reminder with directions',
          icon: MessageSquare,
          delay: 5000,
          status: 'pending'
        },
        {
          id: '5',
          title: 'Check-in Message',
          description: 'Welcome message on arrival',
          icon: CheckCircle,
          delay: 7000,
          status: 'pending'
        }
      ]
    }
  ]

  const currentWorkflow = workflows.find(w => w.id === selectedWorkflow)

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying && currentWorkflow) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 100
          if (newProgress >= currentWorkflow.totalDuration) {
            setIsPlaying(false)
            return currentWorkflow.totalDuration
          }
          return newProgress
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentWorkflow])

  useEffect(() => {
    if (currentWorkflow) {
      const activeStepIndex = currentWorkflow.steps.findIndex(step => 
        progress < step.delay + 1000 && progress >= step.delay
      )
      setCurrentStep(activeStepIndex >= 0 ? activeStepIndex : currentWorkflow.steps.length - 1)
    }
  }, [progress, currentWorkflow])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentStep(0)
  }

  const getStepStatus = (step: WorkflowStep, index: number): 'pending' | 'active' | 'completed' => {
    if (progress < step.delay) return 'pending'
    if (progress >= step.delay && progress < step.delay + 1000) return 'active'
    return 'completed'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Workflow Selector */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {workflows.map((workflow) => (
          <Button
            key={workflow.id}
            variant={selectedWorkflow === workflow.id ? 'default' : 'outline'}
            onClick={() => {
              setSelectedWorkflow(workflow.id)
              handleReset()
            }}
            className={selectedWorkflow === workflow.id 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'border-slate-600 text-white hover:bg-slate-700'
            }
          >
            {workflow.name}
          </Button>
        ))}
      </div>

      {currentWorkflow && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-2xl">{currentWorkflow.name}</CardTitle>
                <p className="text-gray-400">{currentWorkflow.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                {!isPlaying ? (
                  <Button onClick={handlePlay} className="bg-green-500 hover:bg-green-600">
                    <Play className="w-4 h-4 mr-2" />
                    Start Demo
                  </Button>
                ) : (
                  <Button onClick={handlePause} className="bg-yellow-500 hover:bg-yellow-600">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={handleReset} variant="outline" className="border-slate-600 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{Math.round((progress / currentWorkflow.totalDuration) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-100"
                  style={{ width: `${(progress / currentWorkflow.totalDuration) * 100}%` }}
                />
              </div>
            </div>

            {/* Workflow Steps */}
            <div className="space-y-4">
              {currentWorkflow.steps.map((step, index) => {
                const status = getStepStatus(step, index)
                const StepIcon = step.icon
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center p-4 rounded-lg border transition-all duration-300 ${
                      status === 'completed' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : status === 'active'
                        ? 'bg-orange-500/10 border-orange-500/30 text-orange-400 animate-pulse'
                        : 'bg-slate-700/50 border-slate-600 text-gray-400'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      status === 'completed' 
                        ? 'bg-green-500/20'
                        : status === 'active'
                        ? 'bg-orange-500/20 animate-pulse'
                        : 'bg-slate-600/20'
                    }`}>
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <p className="text-sm opacity-80">{step.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {status === 'completed' && (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      )}
                      {status === 'active' && (
                        <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {currentWorkflow.steps.length}
                </div>
                <div className="text-sm text-gray-400">Automated Steps</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round(currentWorkflow.totalDuration / 1000)}s
                </div>
                <div className="text-sm text-gray-400">Total Duration</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  100%
                </div>
                <div className="text-sm text-gray-400">Automation Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
