export type StepCategory = "find" | "strip" | "build" | "respray" | "finish";
export type TaskStatus = "pending" | "completed";

export interface Step {
  id: string;
  title: string;
  description: string;
  date: string;
  category: StepCategory;
  image_url: string;
  sort_order: number;
  created_at?: string;
}

export interface TimelinePhase {
  id: string;
  phase_number: number;
  title: string;
  duration: string;
  image_url: string | null; // Can be null
  image_alt: string | null; // Can be null
  created_at?: string;
}

export interface Task {
  id: string;
  phase_id: string;
  task_id: string;
  task: string;
  details: string;
  technical_notes: string | null;
  status: TaskStatus;
  created_at?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  created_at?: string;
}

export interface Spec {
  id: string;
  section_title: string;
  label: string;
  value: string;
  sort_order: number;
  created_at?: string;
}

export interface Progress {
  id: string;
  title: string;
  date: string;
  tag: string;
  image_url: string;
  image_alt: string;
  description: string;
  sort_order: number;
  created_at?: string;
}

export interface ProjectMeta {
  id: string;
  project_name: string;
  model_type: string;
  tags: string[];
  created_at?: string;
}

// Supabase Database type for typed client
export interface Database {
  public: {
    Tables: {
      steps: {
        Row: Step;
        Insert: Omit<Step, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<Step, "id" | "created_at">>;
      };
      timeline_phases: {
        Row: TimelinePhase;
        Insert: Omit<TimelinePhase, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<TimelinePhase, "id" | "created_at">>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<Task, "id" | "created_at">>;
      };
      stats: {
        Row: Stat;
        Insert: Omit<Stat, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<Stat, "id" | "created_at">>;
      };
      specs: {
        Row: Spec;
        Insert: Omit<Spec, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<Spec, "id" | "created_at">>;
      };
      progress: {
        Row: Progress;
        Insert: Omit<Progress, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<Progress, "id" | "created_at">>;
      };
      project_meta: {
        Row: ProjectMeta;
        Insert: Omit<ProjectMeta, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<ProjectMeta, "id" | "created_at">>;
      };
    };
  };
}

// Helper type for timeline with nested tasks
export interface TimelinePhaseWithTasks extends TimelinePhase {
  tasks: Task[];
}
