import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/storage';

// Types for survey state tracking
interface CompletedSurvey {
  id: string;
  amount: number; // Store as number for calculations
  completedAt: string;
}

// Define earnings store state
interface EarningsState {
  // State
  balance: number; // Current balance in dollars
  completedSurveys: CompletedSurvey[];
  
  // Actions
  addEarnings: (amount: number, surveyId: string) => void;
  resetSurveyState: (surveyId: string) => void;
  isSurveyCompleted: (surveyId: string) => boolean;
  
  // For demo purposes only - would be removed in real app
  resetAllEarnings: () => void;
}

// Create the store
export const useEarningsStore = create<EarningsState>()(
  persist(
    (set, get) => ({
      // Initial state
      balance: 0,
      completedSurveys: [],
      
      // Add earnings from completed survey
      addEarnings: (amount, surveyId) => set((state) => {
        // Check if already completed to prevent double-counting
        if (state.completedSurveys.some(survey => survey.id === surveyId)) {
          return state;
        }
        
        // Add the survey to completed list
        const newCompletedSurveys = [
          ...state.completedSurveys,
          {
            id: surveyId,
            amount,
            completedAt: new Date().toISOString(),
          }
        ];
        
        // Calculate the new balance
        const newBalance = parseFloat((state.balance + amount).toFixed(2));
        
        return {
          balance: newBalance,
          completedSurveys: newCompletedSurveys,
        };
      }),
      
      // Reset a survey's completion state (for demo purposes)
      resetSurveyState: (surveyId) => set((state) => ({
        completedSurveys: state.completedSurveys.filter(
          survey => survey.id !== surveyId
        ),
      })),
      
      // Check if a survey is completed
      isSurveyCompleted: (surveyId) => {
        return get().completedSurveys.some(survey => survey.id === surveyId);
      },
      
      // Reset all earnings (for demo purposes)
      resetAllEarnings: () => set({
        balance: 0,
        completedSurveys: [],
      }),
    }),
    {
      name: 'earnings-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// Selector hooks for common use cases
export const useBalance = () => useEarningsStore((state) => state.balance);
export const useCompletedSurveys = () => useEarningsStore((state) => state.completedSurveys);
export const useAddEarnings = () => useEarningsStore((state) => state.addEarnings);
export const useIsSurveyCompleted = () => useEarningsStore((state) => state.isSurveyCompleted);
export const useResetSurveyState = () => useEarningsStore((state) => state.resetSurveyState); 