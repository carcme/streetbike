export type Stat = Database["public"]["Tables"]["stats"]["Row"];
export type Progress = Database["public"]["Tables"]["progress"]["Row"];
export type Step = Database["public"]["Tables"]["steps"]["Row"];

export interface TimelinePhase {
  id: string;
  phase_number: number;
  title: string;
  duration: string;
  image_url: string | null; // Can be null
  image_alt: string | null; // Can be null
  created_at?: string;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      images: {
        Row: {
          alt_text: string | null;
          created_at: string;
          id: string;
          uploaded_by: string | null;
          url: string;
        };
        Insert: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          uploaded_by?: string | null;
          url: string;
        };
        Update: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          uploaded_by?: string | null;
          url?: string;
        };
        Relationships: [];
      };
      progress: {
        Row: {
          created_at: string;
          date: string | null;
          description: string | null;
          id: string;
          image_alt: string | null;
          image_url: string | null;
          sort_order: number;
          tag: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          description?: string | null;
          id?: string;
          image_alt?: string | null;
          image_url?: string | null;
          sort_order?: number;
          tag?: string | null;
          title: string;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          description?: string | null;
          id?: string;
          image_alt?: string | null;
          image_url?: string | null;
          sort_order?: number;
          tag?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      project_meta: {
        Row: {
          created_at: string;
          id: string;
          model_type: string | null;
          project_name: string | null;
          tags: string[] | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          model_type?: string | null;
          project_name?: string | null;
          tags?: string[] | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          model_type?: string | null;
          project_name?: string | null;
          tags?: string[] | null;
        };
        Relationships: [];
      };
      specs: {
        Row: {
          created_at: string;
          id: string;
          label: string;
          section_title: string;
          sort_order: number;
          value: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          label: string;
          section_title: string;
          sort_order?: number;
          value: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          label?: string;
          section_title?: string;
          sort_order?: number;
          value?: string;
        };
        Relationships: [];
      };
      stats: {
        Row: {
          created_at: string;
          featured: boolean | null;
          id: string;
          label: string;
          value: string;
        };
        Insert: {
          created_at?: string;
          featured?: boolean | null;
          id?: string;
          label: string;
          value: string;
        };
        Update: {
          created_at?: string;
          featured?: boolean | null;
          id?: string;
          label?: string;
          value?: string;
        };
        Relationships: [];
      };
      steps: {
        Row: {
          category: Database["public"]["Enums"]["step_category"];
          created_at: string;
          date: string;
          description: string;
          id: string;
          image_url: string | null;
          sort_order: number;
          title: string;
        };
        Insert: {
          category: Database["public"]["Enums"]["step_category"];
          created_at?: string;
          date: string;
          description: string;
          id?: string;
          image_url?: string | null;
          sort_order?: number;
          title: string;
        };
        Update: {
          category?: Database["public"]["Enums"]["step_category"];
          created_at?: string;
          date?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      task_images: {
        Row: {
          created_at: string;
          image_id: string;
          task_id: string;
        };
        Insert: {
          created_at?: string;
          image_id: string;
          task_id: string;
        };
        Update: {
          created_at?: string;
          image_id?: string;
          task_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "task_images_image_id_fkey";
            columns: ["image_id"];
            isOneToOne: false;
            referencedRelation: "images";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "task_images_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          created_at: string;
          details: string;
          id: string;
          phase_id: string | null;
          status: Database["public"]["Enums"]["task_status"];
          task: string;
          task_id: string;
          technical_notes: string | null;
        };
        Insert: {
          created_at?: string;
          details: string;
          id?: string;
          phase_id?: string | null;
          status?: Database["public"]["Enums"]["task_status"];
          task: string;
          task_id: string;
          technical_notes?: string | null;
        };
        Update: {
          created_at?: string;
          details?: string;
          id?: string;
          phase_id?: string | null;
          status?: Database["public"]["Enums"]["task_status"];
          task?: string;
          task_id?: string;
          technical_notes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_phase_id_fkey";
            columns: ["phase_id"];
            isOneToOne: false;
            referencedRelation: "timeline_phases";
            referencedColumns: ["id"];
          },
        ];
      };
      timeline_phases: {
        Row: {
          created_at: string;
          duration: string;
          id: string;
          image_alt: string | null;
          image_url: string | null;
          phase_number: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          duration: string;
          id?: string;
          image_alt?: string | null;
          image_url?: string | null;
          phase_number: number;
          title: string;
        };
        Update: {
          created_at?: string;
          duration?: string;
          id?: string;
          image_alt?: string | null;
          image_url?: string | null;
          phase_number?: number;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      step_category: "find" | "strip" | "build" | "finish";
      task_status: "pending" | "completed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      step_category: ["find", "strip", "build", "finish"],
      task_status: ["pending", "completed"],
    },
  },
} as const;

export type StepCategory = "find" | "strip" | "build" | "respray" | "finish";
export type TaskStatus = "pending" | "completed";
