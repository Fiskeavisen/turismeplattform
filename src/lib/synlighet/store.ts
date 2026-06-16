import { visibilityActions, weeklyReport } from "./demo-data";
import type { ActionStatus, VisibilityAction, WeeklyReport, WeeklyReportStatus } from "./types";

type VisibilityDemoState = {
  actions: VisibilityAction[];
  report: WeeklyReport;
};

const globalForVisibility = globalThis as typeof globalThis & {
  visibilityDemoState?: VisibilityDemoState;
};

function cloneState(): VisibilityDemoState {
  return {
    actions: visibilityActions.map((action) => ({
      ...action,
      implementationSteps: [...action.implementationSteps],
      qaIssues: [...action.qaIssues],
      sourceData: { ...action.sourceData },
      measurement: action.measurement ? { ...action.measurement } : undefined,
    })),
    report: { ...weeklyReport, focusActions: [...weeklyReport.focusActions], authorityAdvice: [...weeklyReport.authorityAdvice] },
  };
}

export function getVisibilityDemoState() {
  if (!globalForVisibility.visibilityDemoState) {
    globalForVisibility.visibilityDemoState = cloneState();
  }

  return globalForVisibility.visibilityDemoState;
}

export function getActionById(id: string) {
  return getVisibilityDemoState().actions.find((action) => action.id === id);
}

export function getReportById(id: string) {
  const { report } = getVisibilityDemoState();
  return report.id === id ? report : null;
}

export function updateActionStatus(id: string, status: ActionStatus) {
  const state = getVisibilityDemoState();
  const action = state.actions.find((item) => item.id === id);

  if (!action) {
    return null;
  }

  const now = new Date();
  action.status = status;
  action.updatedAt = now.toISOString().slice(0, 10);

  if (status === "completed" || status === "measuring") {
    const measurementEnd = new Date(now);
    measurementEnd.setDate(measurementEnd.getDate() + 28);

    action.status = "measuring";
    action.completedAt = now.toISOString().slice(0, 10);
    action.measurementStartAt = now.toISOString().slice(0, 10);
    action.measurementEndAt = measurementEnd.toISOString().slice(0, 10);
  }

  return action;
}

export function approveReport(status: WeeklyReportStatus = "approved") {
  const state = getVisibilityDemoState();
  state.report.status = status;

  if (status === "sent") {
    state.report.sentAt = new Date().toISOString();
  } else {
    state.report.sentAt = undefined;
  }

  return state.report;
}

export function resetVisibilityDemoState() {
  globalForVisibility.visibilityDemoState = cloneState();
  return globalForVisibility.visibilityDemoState;
}
