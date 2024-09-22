import { useToast } from "@/hooks/use-toast"

export function useToastNotifications() {
  const { toast } = useToast()

  const showErrorToast = (title: string, description?: string) => {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    })
  }

  const showSuccessToast = (title: string, description?: string) => {
    toast({
      variant: "default",
      title: title,
      description: description,
    })
  }

  return { showErrorToast, showSuccessToast }
}