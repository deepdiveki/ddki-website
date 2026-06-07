"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlarmClock,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Globe,
  HelpCircle,
  Info,
  Notebook,
  PanelRightClose,
  Play,
  ScrollText,
  Search,
  Sparkles,
  Star,
  Target,
  Trophy,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { courseContent, courseSubtitle, courseTitle, type Lesson, type Section, type ToolKey } from "../_data/courseContent";
import { courseScripts } from "../_data/courseScripts";
import Quiz from "./Quiz";
import PromptBuilder from "./tools/PromptBuilder";
import HallucinationTrainer from "./tools/HallucinationTrainer";
import PlatformFinder from "./tools/PlatformFinder";
import LearningPathWizard from "./tools/LearningPathWizard";
import UeBuilder from "./tools/UeBuilder";
import SubjectTransfer from "./tools/SubjectTransfer";
import DistractorChecker from "./tools/DistractorChecker";
import RolePromptBuilder from "./tools/RolePromptBuilder";
import LanguageLevelAdvisor from "./tools/LanguageLevelAdvisor";
import SusOrAiQuiz from "./tools/SusOrAiQuiz";
import DetectorTrainer from "./tools/DetectorTrainer";
import TaskVulnerabilityCheck from "./tools/TaskVulnerabilityCheck";
import TaskAudit from "./tools/TaskAudit";
import ExamFormatFinder from "./tools/ExamFormatFinder";
import AiAgreementBuilder from "./tools/AiAgreementBuilder";
import CareerResilience from "./tools/CareerResilience";
import BiasPrediction from "./tools/BiasPrediction";
import SchoolStageFinder from "./tools/SchoolStageFinder";
import SkepticCounter from "./tools/SkepticCounter";
import InstructionsBuilder from "./tools/InstructionsBuilder";
import AssistantPlatformWizard from "./tools/AssistantPlatformWizard";
import WorkflowRouting from "./tools/WorkflowRouting";
import EthicsChecklist from "./tools/EthicsChecklist";

function renderTool(tool: ToolKey) {
  switch (tool) {
    case "prompt-builder": return <PromptBuilder />;
    case "hallucination-trainer": return <HallucinationTrainer />;
    case "platform-finder": return <PlatformFinder />;
    case "learning-path-wizard": return <LearningPathWizard />;
    case "ue-builder": return <UeBuilder />;
    case "subject-transfer": return <SubjectTransfer />;
    case "distractor-checker": return <DistractorChecker />;
    case "role-prompt-builder": return <RolePromptBuilder />;
    case "language-level-advisor": return <LanguageLevelAdvisor />;
    case "sus-or-ai": return <SusOrAiQuiz />;
    case "detector-trainer": return <DetectorTrainer />;
    case "task-vulnerability-check": return <TaskVulnerabilityCheck />;
    case "task-audit": return <TaskAudit />;
    case "exam-format-finder": return <ExamFormatFinder />;
    case "ai-agreement-builder": return <AiAgreementBuilder />;
    case "career-resilience": return <CareerResilience />;
    case "bias-prediction": return <BiasPrediction />;
    case "school-stage-finder": return <SchoolStageFinder />;
    case "skeptic-counter": return <SkepticCounter />;
    case "instructions-builder": return <InstructionsBuilder />;
    case "assistant-platform-wizard": return <AssistantPlatformWizard />;
    case "workflow-routing": return <WorkflowRouting />;
    case "ethics-checklist": return <EthicsChecklist />;
  }
}

const TABS = [
  "Übersicht",
  "Skript",
  "Notizen",
  "Bewertungen",
] as const;
type Tab = (typeof TABS)[number];

const SIDEBAR_TABS = ["Kursinhalt", "AI Assistant"] as const;
type SidebarTab = (typeof SIDEBAR_TABS)[number];

const allLessons = courseContent.flatMap((s) => s.lessons);
const allLessonIds = new Set(allLessons.map((l) => l.id));
const allSectionIds = new Set(courseContent.map((s) => s.id));

const STORAGE_KEY = "ki-praxis-komplettkurs:v1";

// Direct video file (HTML5 <video>) vs. embedded player (iframe).
const DIRECT_VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogg|ogv)(\?.*)?$/i;
function isDirectVideoUrl(url: string): boolean {
  return DIRECT_VIDEO_EXT.test(url);
}

type QuizScore = { score: number; total: number };

type StoredState = {
  completedLessons: string[];
  currentLessonId: string;
  expandedSections: string[];
  notes: Record<string, string>;
  ratings: Record<string, number>;
  quizScores: Record<string, QuizScore>;
};

function sanitizeRecord<T>(
  raw: unknown,
  valueGuard: (v: unknown) => v is T,
): Record<string, T> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, T> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (allLessonIds.has(k) && valueGuard(v)) out[k] = v;
  }
  return out;
}

function loadStoredState(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    if (
      Array.isArray(parsed.completedLessons) &&
      typeof parsed.currentLessonId === "string" &&
      Array.isArray(parsed.expandedSections)
    ) {
      return {
        completedLessons: parsed.completedLessons.filter((id) =>
          allLessonIds.has(id),
        ),
        currentLessonId: allLessonIds.has(parsed.currentLessonId)
          ? parsed.currentLessonId
          : "s1-1",
        expandedSections: parsed.expandedSections.filter((id) =>
          allSectionIds.has(id),
        ),
        notes: sanitizeRecord<string>(
          parsed.notes,
          (v): v is string => typeof v === "string",
        ),
        ratings: sanitizeRecord<number>(
          parsed.ratings,
          (v): v is number =>
            typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 5,
        ),
        quizScores: sanitizeRecord<QuizScore>(
          parsed.quizScores,
          (v): v is QuizScore =>
            v !== null &&
            typeof v === "object" &&
            typeof (v as QuizScore).score === "number" &&
            typeof (v as QuizScore).total === "number",
        ),
      };
    }
    return null;
  } catch {
    return null;
  }
}

function saveStoredState(state: StoredState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / privacy-mode failures
  }
}

export default function CoursePlayer() {
  const [activeTab, setActiveTab] = useState<Tab>("Übersicht");
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>("Kursinhalt");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["s1"]));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [currentLessonId, setCurrentLessonId] = useState<string>("s1-1");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [quizScores, setQuizScores] = useState<Record<string, QuizScore>>({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [notesOverviewOpen, setNotesOverviewOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state on mount (client-only to avoid SSR/hydration mismatch).
  useEffect(() => {
    const stored = loadStoredState();
    if (stored) {
      setCompletedLessons(new Set(stored.completedLessons));
      setCurrentLessonId(stored.currentLessonId);
      setExpandedSections(new Set(stored.expandedSections));
      setNotes(stored.notes);
      setRatings(stored.ratings);
      setQuizScores(stored.quizScores);
    }
    // Default sidebar to closed on narrow viewports (mobile/tablet portrait).
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    setHydrated(true);
  }, []);

  // Persist on change (skip until hydrated so we don't overwrite stored values with defaults).
  useEffect(() => {
    if (!hydrated) return;
    saveStoredState({
      completedLessons: Array.from(completedLessons),
      currentLessonId,
      expandedSections: Array.from(expandedSections),
      notes,
      ratings,
      quizScores,
    });
  }, [completedLessons, currentLessonId, expandedSections, notes, ratings, quizScores, hydrated]);

  const currentLesson = useMemo(
    () => allLessons.find((l) => l.id === currentLessonId),
    [currentLessonId],
  );

  const setNoteForCurrent = (value: string) => {
    if (!currentLesson) return;
    setNotes((prev) => ({ ...prev, [currentLesson.id]: value }));
  };

  const setRatingForCurrent = (value: number) => {
    if (!currentLesson) return;
    setRatings((prev) => {
      const next = { ...prev };
      if (value <= 0) delete next[currentLesson.id];
      else next[currentLesson.id] = value;
      return next;
    });
  };

  const recordQuizScore = (score: number, total: number) => {
    if (!currentLesson) return;
    setQuizScores((prev) => ({
      ...prev,
      [currentLesson.id]: { score, total },
    }));
  };

  const jumpToLesson = (id: string) => {
    if (!allLessonIds.has(id)) return;
    setCurrentLessonId(id);
    const section = courseContent.find((s) =>
      s.lessons.some((l) => l.id === id),
    );
    if (section) {
      setExpandedSections((prev) => {
        if (prev.has(section.id)) return prev;
        const next = new Set(prev);
        next.add(section.id);
        return next;
      });
    }
  };

  // Global progress + next lesson.
  const nextLesson = useMemo(() => {
    if (!currentLesson) return null;
    const idx = allLessons.findIndex((l) => l.id === currentLesson.id);
    if (idx < 0 || idx >= allLessons.length - 1) return null;
    return allLessons[idx + 1];
  }, [currentLesson]);

  const totalLessons = allLessons.length;
  const completedCount = completedLessons.size;
  const progressPercent =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const toggleSection = (id: string) =>
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleComplete = (id: string) =>
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="min-h-screen bg-white pt-24 font-inter lg:pt-28">
      <div
        className={`grid min-h-[calc(100vh-6rem)] grid-cols-1 lg:min-h-[calc(100vh-7rem)] ${
          sidebarOpen ? "lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]" : "lg:grid-cols-1"
        } transition-[grid-template-columns] duration-300`}
      >
        <MainColumn
          currentLesson={currentLesson}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sidebarOpen={sidebarOpen}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNotesOverview={() => setNotesOverviewOpen(true)}
          note={currentLesson ? notes[currentLesson.id] ?? "" : ""}
          onNoteChange={setNoteForCurrent}
          rating={currentLesson ? ratings[currentLesson.id] ?? 0 : 0}
          onRatingChange={setRatingForCurrent}
          onRecordQuizScore={recordQuizScore}
          onJumpToLesson={jumpToLesson}
          nextLesson={nextLesson}
          completedCount={completedCount}
          totalLessons={totalLessons}
          progressPercent={progressPercent}
          onCompleteCurrentLesson={() =>
            setCompletedLessons((prev) => {
              if (!currentLesson || prev.has(currentLesson.id)) return prev;
              const next = new Set(prev);
              next.add(currentLesson.id);
              return next;
            })
          }
        />

        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <CourseSidebar
              activeSidebarTab={activeSidebarTab}
              onSidebarTabChange={setActiveSidebarTab}
              onClose={() => setSidebarOpen(false)}
              expandedSections={expandedSections}
              onToggleSection={toggleSection}
              completedLessons={completedLessons}
              onToggleComplete={toggleComplete}
              ratings={ratings}
              quizScores={quizScores}
              currentLessonId={currentLessonId}
              onSelectLesson={(id) => {
                setCurrentLessonId(id);
                if (typeof window !== "undefined" && window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
            />
          </>
        )}
      </div>

      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onSelectLesson={(id) => {
            jumpToLesson(id);
            setSearchOpen(false);
          }}
        />
      )}

      {notesOverviewOpen && (
        <NotesOverviewModal
          notes={notes}
          onClose={() => setNotesOverviewOpen(false)}
          onSelectLesson={(id) => {
            jumpToLesson(id);
            setNotesOverviewOpen(false);
          }}
        />
      )}
    </div>
  );
}

function MainColumn({
  currentLesson,
  activeTab,
  onTabChange,
  sidebarOpen,
  onOpenSidebar,
  onOpenSearch,
  onOpenNotesOverview,
  note,
  onNoteChange,
  rating,
  onRatingChange,
  onRecordQuizScore,
  onJumpToLesson,
  nextLesson,
  completedCount,
  totalLessons,
  progressPercent,
  onCompleteCurrentLesson,
}: {
  currentLesson: Lesson | undefined;
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
  onOpenSearch: () => void;
  onOpenNotesOverview: () => void;
  note: string;
  onNoteChange: (value: string) => void;
  rating: number;
  onRatingChange: (value: number) => void;
  onRecordQuizScore: (score: number, total: number) => void;
  onJumpToLesson: (id: string) => void;
  nextLesson: Lesson | null;
  completedCount: number;
  totalLessons: number;
  progressPercent: number;
  onCompleteCurrentLesson: () => void;
}) {
  const isQuiz = currentLesson?.type === "quiz" && currentLesson.questions;
  const isTool = currentLesson?.type === "tool" && currentLesson.tool;

  if ((isQuiz || isTool) && currentLesson) {
    return (
      <div className="flex min-w-0 flex-col bg-white">
        {!sidebarOpen && (
          <div className="flex justify-end px-4 pt-4">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="flex h-11 items-center gap-2 rounded-lg border border-border-secondary bg-white px-3 text-sm text-text-primary transition hover:bg-background-secondary"
            >
              <PanelRightClose className="h-4 w-4" />
              Kursinhalt
            </button>
          </div>
        )}
        {isQuiz ? (
          <Quiz
            title={currentLesson.title}
            questions={currentLesson.questions!}
            onComplete={(score, total) => {
              onRecordQuizScore(score, total);
              onCompleteCurrentLesson();
            }}
          />
        ) : (
          renderTool(currentLesson.tool!)
        )}
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col">
      <div className="px-4 pt-4 sm:px-8 sm:pt-6 lg:px-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
          {currentLesson?.videoUrl ? (
            isDirectVideoUrl(currentLesson.videoUrl) ? (
              <video
                key={currentLesson.id}
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                controls
                preload="metadata"
                playsInline
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <iframe
                key={currentLesson.id}
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="group flex h-20 w-20 items-center justify-center rounded-full bg-black/40 ring-1 ring-white/15 transition hover:bg-black/60"
                aria-label="Video abspielen"
              >
                <Play className="ml-1 h-8 w-8 fill-white text-white" />
              </button>
            </div>
          )}
          {!sidebarOpen && (
            <button
              type="button"
              onClick={onOpenSidebar}
              className="absolute top-4 right-4 z-10 flex h-11 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm text-white backdrop-blur transition hover:bg-white/20"
            >
              <PanelRightClose className="h-4 w-4" />
              Kursinhalt
            </button>
          )}
        </div>
      </div>

      <div className="sticky top-24 z-10 border-b border-border-secondary bg-white lg:top-28">
        <div className="h-1 w-full bg-background-secondary">
          <div
            className="h-full bg-purple transition-[width] duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
            aria-hidden="true"
          />
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto px-2 sm:px-4">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex h-12 w-12 shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary"
            aria-label="Inhalt durchsuchen"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onOpenNotesOverview}
            className="flex h-12 w-12 shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary"
            aria-label="Alle Notizen anzeigen"
            title="Alle Notizen"
          >
            <Notebook className="h-4 w-4" />
          </button>
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`relative flex h-12 shrink-0 items-center px-3 text-sm font-medium transition ${
                  isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full bg-purple" />
                )}
              </button>
            );
          })}
          <div className="ml-auto hidden shrink-0 pr-3 text-xs text-text-tertiary sm:block">
            {progressPercent} % · {completedCount}/{totalLessons}
          </div>
        </nav>
      </div>

      <div className="px-4 py-8 sm:px-8 lg:px-12">
        {activeTab === "Übersicht" ? (
          <OverviewTab
            currentLesson={currentLesson}
            nextLesson={nextLesson}
            onJumpToLesson={onJumpToLesson}
          />
        ) : activeTab === "Skript" ? (
          <ScriptTab
            currentLesson={currentLesson}
            onJumpToLesson={onJumpToLesson}
          />
        ) : activeTab === "Notizen" ? (
          <NotesTab
            currentLesson={currentLesson}
            note={note}
            onNoteChange={onNoteChange}
          />
        ) : activeTab === "Bewertungen" ? (
          <RatingsTab
            currentLesson={currentLesson}
            rating={rating}
            onRatingChange={onRatingChange}
          />
        ) : null}
      </div>
    </div>
  );
}

function OverviewTab({
  currentLesson,
  nextLesson,
  onJumpToLesson,
}: {
  currentLesson: Lesson | undefined;
  nextLesson: Lesson | null;
  onJumpToLesson: (id: string) => void;
}) {
  const currentSection: Section | undefined = currentLesson
    ? courseContent.find((s) => s.lessons.some((l) => l.id === currentLesson.id))
    : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {currentLesson ? (
        <>
          {currentSection && (
            <p className="text-xs font-bold uppercase tracking-wider text-purple">
              {currentSection.title}
            </p>
          )}

          <h1 className="text-display-xs font-medium leading-tight text-text-primary lg:text-display-sm">
            {currentLesson.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-secondary">
            {currentLesson.duration && (
              <div className="flex items-center gap-1.5">
                <AlarmClock className="h-4 w-4 text-text-tertiary" />
                {currentLesson.duration}
              </div>
            )}
            {currentLesson.format && (
              <div className="flex items-center gap-1.5">
                <Info className="h-4 w-4 text-text-tertiary" />
                {currentLesson.format}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-text-tertiary" />
              Deutsch
            </div>
          </div>

          {currentLesson.hook && (
            <div className="rounded-2xl border border-border-secondary bg-background-secondary p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-light-4 text-purple">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-text-primary">
                    Warum jetzt wichtig?
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-primary">
                    {currentLesson.hook}
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentLesson.lernziel && (
            <div className="rounded-2xl border border-border-secondary bg-background-secondary p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-light-4 text-purple">
                  <Target className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-text-primary">
                    Lernziel
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-primary">
                    {currentLesson.lernziel}
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentLesson.takeaway && (
            <div className="rounded-2xl border border-purple-light-3 bg-purple-light-5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
                  <Star className="h-5 w-5 fill-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-text-primary">
                    Take-away
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-primary">
                    {currentLesson.takeaway}
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentLesson.downloads && currentLesson.downloads.length > 0 && (
            <div className="rounded-2xl border border-border-secondary bg-background-secondary p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-light-4 text-purple">
                  <Download className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-text-primary">
                    Downloads
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
                    {currentLesson.downloads.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {d.url ? (
                          <a
                            href={d.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-purple underline underline-offset-2 hover:no-underline"
                          >
                            <Download className="h-3.5 w-3.5 shrink-0" />
                            <span>{d.name}</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-text-secondary">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-tertiary" />
                            <span>{d.name}</span>
                            <span className="ml-1 inline-flex items-center rounded-full bg-background-primary px-2 py-0.5 text-xs font-medium text-text-tertiary ring-1 ring-border-secondary">
                              kommt
                            </span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="text-display-xs font-medium leading-tight text-text-primary lg:text-display-sm">
            {courseTitle}
          </h1>
          <p className="text-md font-light text-text-secondary">
            {courseSubtitle}
          </p>
        </>
      )}

      {currentLesson && nextLesson && (
        <button
          type="button"
          onClick={() => onJumpToLesson(nextLesson.id)}
          className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-purple bg-white p-5 text-left transition hover:bg-purple-light-5"
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple">
              Nächste Lektion
            </p>
            <p className="mt-1 truncate text-base font-semibold text-text-primary">
              {nextLesson.title}
            </p>
            {nextLesson.duration && (
              <p className="mt-0.5 text-xs text-text-tertiary">
                {nextLesson.duration}
              </p>
            )}
          </div>
          <ChevronRight className="h-6 w-6 shrink-0 text-purple transition group-hover:translate-x-1" />
        </button>
      )}
    </div>
  );
}

function ScriptTab({
  currentLesson,
  onJumpToLesson,
}: {
  currentLesson: Lesson | undefined;
  onJumpToLesson: (id: string) => void;
}) {
  if (!currentLesson) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-text-secondary">Keine Lektion ausgewählt.</p>
      </div>
    );
  }

  if (currentLesson.type !== "video") {
    return (
      <div className="mx-auto max-w-3xl">
        <h2 className="text-xl font-semibold text-text-primary">Skript</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Skripte gibt es nur für Video-Lektionen.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-light-4 text-purple">
          <ScrollText className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Aufnahme-Skript
          </h2>
          <p className="text-xs text-text-tertiary">
            {currentLesson.title}
            {currentLesson.duration ? ` · ${currentLesson.duration}` : ""}
          </p>
        </div>
      </div>

      {(() => {
        const rawScript = currentLesson.script ?? courseScripts[currentLesson.id];
        const script = rawScript ? linkifyScript(rawScript) : rawScript;
        return script ? (
          <article className="text-base leading-relaxed text-text-primary">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="my-4">{children}</p>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-text-primary">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote className="my-5 rounded-r-lg border-l-4 border-purple bg-purple-light-5 px-4 py-3 italic text-text-primary">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="my-4 list-disc space-y-1 pl-6 marker:text-purple">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-4 list-decimal space-y-1 pl-6 marker:text-purple">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                h1: ({ children }) => (
                  <h2 className="mt-8 mb-3 text-xl font-semibold text-text-primary">{children}</h2>
                ),
                h2: ({ children }) => (
                  <h3 className="mt-6 mb-2 text-lg font-semibold text-text-primary">{children}</h3>
                ),
                h3: ({ children }) => (
                  <h4 className="mt-5 mb-2 text-base font-semibold text-text-primary">{children}</h4>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-background-secondary px-1.5 py-0.5 font-mono text-sm">
                    {children}
                  </code>
                ),
                hr: () => <hr className="my-6 border-border-secondary" />,
                table: ({ children }) => (
                  <div className="my-5 overflow-x-auto rounded-lg border border-border-secondary">
                    <table className="w-full border-collapse text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-background-secondary">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="border-b border-border-secondary px-3 py-2 text-left font-semibold text-text-primary">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-border-secondary px-3 py-2 align-top last:border-b-0">
                    {children}
                  </td>
                ),
                a: ({ children, href }) => {
                  if (href?.startsWith("lesson:")) {
                    const targetId = href.slice("lesson:".length);
                    return (
                      <button
                        type="button"
                        onClick={() => onJumpToLesson(targetId)}
                        className="cursor-pointer rounded text-purple underline underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
                      >
                        {children}
                      </button>
                    );
                  }
                  return (
                    <a
                      href={href}
                      className="text-purple underline underline-offset-2 hover:no-underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {script}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="rounded-2xl border border-border-secondary bg-background-secondary p-5 text-sm text-text-secondary">
            Skript folgt — wird aus dem Notion-Board nachgeladen.
          </div>
        );
      })()}
    </div>
  );
}

function NotesTab({
  currentLesson,
  note,
  onNoteChange,
}: {
  currentLesson: Lesson | undefined;
  note: string;
  onNoteChange: (value: string) => void;
}) {
  if (!currentLesson) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-text-secondary">Keine Lektion ausgewählt.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-light-4 text-purple">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Notizen</h2>
          <p className="text-xs text-text-tertiary">
            {currentLesson.title}
          </p>
        </div>
      </div>

      <textarea
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder="Schreibe hier deine Notizen, Fragen oder Aha-Momente zu dieser Lektion …"
        className="block min-h-[400px] w-full resize-y rounded-2xl border border-border-secondary bg-white p-4 text-sm leading-relaxed text-text-primary outline-none transition focus:border-purple focus:ring-2 focus:ring-purple-light-4"
      />

      <div className="flex items-center justify-between text-xs text-text-tertiary">
        <span>{note.length === 0 ? "Noch keine Notizen" : `${note.length} Zeichen`}</span>
        <span>Wird automatisch lokal gespeichert</span>
      </div>
    </div>
  );
}

function RatingsTab({
  currentLesson,
  rating,
  onRatingChange,
}: {
  currentLesson: Lesson | undefined;
  rating: number;
  onRatingChange: (value: number) => void;
}) {
  if (!currentLesson) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-text-secondary">Keine Lektion ausgewählt.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-light-4 text-purple">
          <Star className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Bewertung</h2>
          <p className="text-xs text-text-tertiary">
            {currentLesson.title}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border-secondary bg-background-secondary p-6">
        <p className="text-sm text-text-secondary">
          Wie hilfreich war diese Lektion für dich?
        </p>
        <div className="mt-4 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => {
            const active = value <= rating;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onRatingChange(value === rating ? 0 : value)}
                aria-label={`${value} von 5 Sternen`}
                aria-pressed={active}
                className="rounded-md p-2 transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
              >
                <Star
                  className={`h-10 w-10 transition ${
                    active
                      ? "fill-purple text-purple"
                      : "fill-transparent text-border-tertiary hover:text-purple"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            {rating > 0 ? `Deine Bewertung: ${rating} / 5` : "Noch keine Bewertung"}
          </span>
          {rating > 0 && (
            <button
              type="button"
              onClick={() => onRatingChange(0)}
              className="text-xs text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline"
            >
              Bewertung entfernen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CourseSidebar({
  activeSidebarTab,
  onSidebarTabChange,
  onClose,
  expandedSections,
  onToggleSection,
  completedLessons,
  onToggleComplete,
  ratings,
  quizScores,
  currentLessonId,
  onSelectLesson,
}: {
  activeSidebarTab: SidebarTab;
  onSidebarTabChange: (t: SidebarTab) => void;
  onClose: () => void;
  expandedSections: Set<string>;
  onToggleSection: (id: string) => void;
  completedLessons: Set<string>;
  onToggleComplete: (id: string) => void;
  ratings: Record<string, number>;
  quizScores: Record<string, QuizScore>;
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
}) {
  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex w-[88%] max-w-[400px] flex-col border-l border-border-secondary bg-white shadow-2xl lg:static lg:z-auto lg:w-auto lg:max-w-none lg:shadow-none lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)]">
      <div className="flex items-center justify-between border-b border-border-secondary px-4 pt-4">
        <div className="flex items-end gap-4">
          {SIDEBAR_TABS.map((tab) => {
            const isActive = tab === activeSidebarTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onSidebarTabChange(tab)}
                className={`relative flex items-center gap-1.5 pb-3 text-base font-semibold transition ${
                  isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab === "AI Assistant" && (
                  <Sparkles className="h-4 w-4 text-purple" />
                )}
                {tab}
                {isActive && (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-purple" />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 flex h-8 w-8 items-center justify-center rounded-full text-text-tertiary transition hover:bg-background-secondary hover:text-text-primary"
          aria-label="Kursinhalt schließen"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeSidebarTab === "Kursinhalt" ? (
          <SectionList
            expandedSections={expandedSections}
            onToggleSection={onToggleSection}
            completedLessons={completedLessons}
            onToggleComplete={onToggleComplete}
            ratings={ratings}
            quizScores={quizScores}
            currentLessonId={currentLessonId}
            onSelectLesson={onSelectLesson}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
            <Sparkles className="h-8 w-8 text-purple" />
            <h3 className="mt-3 text-base font-semibold text-text-primary">
              AI Assistant
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Stell hier später Fragen zum Kursinhalt.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

function SectionList({
  expandedSections,
  onToggleSection,
  completedLessons,
  onToggleComplete,
  ratings,
  quizScores,
  currentLessonId,
  onSelectLesson,
}: {
  expandedSections: Set<string>;
  onToggleSection: (id: string) => void;
  completedLessons: Set<string>;
  onToggleComplete: (id: string) => void;
  ratings: Record<string, number>;
  quizScores: Record<string, QuizScore>;
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
}) {
  // Build kursweit fortlaufende Labels: "Lektion N", "Quiz N", "Tool N" — jeweils eigener Zähler
  const labels = new Map<string, string>();
  let lessonCounter = 0;
  let quizCounter = 0;
  let toolCounter = 0;
  for (const section of courseContent) {
    for (const lesson of section.lessons) {
      if (lesson.type === "quiz") {
        quizCounter += 1;
        labels.set(lesson.id, `Quiz ${quizCounter}`);
      } else if (lesson.type === "tool") {
        toolCounter += 1;
        labels.set(lesson.id, `Tool ${toolCounter}`);
      } else {
        lessonCounter += 1;
        labels.set(lesson.id, `Lektion ${lessonCounter}`);
      }
    }
  }

  return (
    <ul className="divide-y divide-border-secondary">
      {courseContent.map((section, index) => {
        const isOpen = expandedSections.has(section.id);
        const completedInSection = section.lessons.filter((l) =>
          completedLessons.has(l.id),
        ).length;

        return (
          <li key={section.id} className="bg-background-secondary">
            <button
              type="button"
              onClick={() => onToggleSection(section.id)}
              className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left transition hover:bg-purple-light-5/50"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-snug text-text-primary">
                  {section.unpublished ? (
                    <>
                      Nicht veröffentlichter Abschnitt 0: {section.title} ({section.totalDuration})
                    </>
                  ) : (
                    <>
                      Abschnitt {index + 1}: {section.title} ({section.totalDuration})
                    </>
                  )}
                </h3>
                <p className="mt-1 text-xs text-text-tertiary">
                  {completedInSection} / {section.lessons.length} | {section.totalDuration.replace("ca. ", "")}
                </p>
              </div>
              <ChevronDown
                className={`mt-0.5 h-5 w-5 shrink-0 text-text-secondary transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && section.lessons.length > 0 && (
              <ul className="bg-white">
                {section.lessons.map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    label={labels.get(lesson.id) ?? ""}
                    isCompleted={completedLessons.has(lesson.id)}
                    isCurrent={currentLessonId === lesson.id}
                    rating={ratings[lesson.id] ?? 0}
                    quizScore={quizScores[lesson.id]}
                    onToggleComplete={() => onToggleComplete(lesson.id)}
                    onSelect={() => onSelectLesson(lesson.id)}
                  />
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function LessonRow({
  lesson,
  label,
  isCompleted,
  isCurrent,
  rating,
  quizScore,
  onToggleComplete,
  onSelect,
}: {
  lesson: Lesson;
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
  rating: number;
  quizScore: QuizScore | undefined;
  onToggleComplete: () => void;
  onSelect: () => void;
}) {
  const Icon =
    lesson.type === "video"
      ? Play
      : lesson.type === "quiz"
        ? HelpCircle
        : lesson.type === "tool"
          ? Wrench
          : FileText;

  return (
    <li
      className={`flex items-start gap-3 border-l-4 px-5 py-3 transition ${
        isCurrent
          ? "border-purple bg-purple-light-5"
          : "border-transparent hover:bg-background-secondary"
      }`}
    >
      <button
        type="button"
        onClick={onToggleComplete}
        aria-label={isCompleted ? "Als nicht erledigt markieren" : "Als erledigt markieren"}
        className="-m-2 flex h-9 w-9 shrink-0 items-center justify-center"
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded border-2 transition ${
            isCompleted
              ? "border-purple bg-purple text-white"
              : "border-border-tertiary bg-white hover:border-purple"
          }`}
        >
          {isCompleted && (
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M2 6.5L4.5 9L10 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </button>

      <button
        type="button"
        onClick={onSelect}
        className="flex-1 text-left"
      >
        <div className="text-sm leading-snug text-text-primary">
          <span className="font-semibold">{label}:</span> {lesson.title}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-tertiary">
          <span className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5" />
            {lesson.duration ?? ""}
          </span>
          {rating > 0 && (
            <span
              className="flex items-center gap-0.5 text-purple"
              aria-label={`Bewertet mit ${rating} von 5 Sternen`}
            >
              <Star className="h-3 w-3 fill-purple" />
              <span className="font-medium">{rating}</span>
            </span>
          )}
          {quizScore && (
            <span
              className="flex items-center gap-1 text-purple"
              aria-label={`Quiz-Ergebnis: ${quizScore.score} von ${quizScore.total}`}
            >
              <Trophy className="h-3 w-3" />
              <span className="font-medium">
                {quizScore.score}/{quizScore.total}
              </span>
            </span>
          )}
        </div>
      </button>
    </li>
  );
}

// ============================================================
// Script cross-reference linkifying
// ============================================================

// Map roman module numerals to their section IDs.
// Modul I = Sektion 3 (Unterrichtseinheiten), II = 4 (Plagiate), III = 5 (Chancen), IV = 6 (Assistenten).
const MODUL_TO_SECTION: Record<string, string> = {
  I: "s3",
  II: "s4",
  III: "s5",
  IV: "s6",
};

function firstLessonOfSection(sectionId: string): string | null {
  const section = courseContent.find((s) => s.id === sectionId);
  return section?.lessons[0]?.id ?? null;
}

function linkifyScript(script: string): string {
  let out = script;
  // "Lektion 4.14" → lesson:s4-14
  out = out.replace(/\bLektion (\d+)\.(\d+)\b/g, (match, s, l) => {
    const id = `s${s}-${l}`;
    return allLessonIds.has(id) ? `[${match}](lesson:${id})` : match;
  });
  // "Sektion 4" → lesson:<first lesson of s4>
  out = out.replace(/\bSektion (\d+)\b/g, (match, n) => {
    const sectionId = `s${n}`;
    const target = firstLessonOfSection(sectionId);
    return target ? `[${match}](lesson:${target})` : match;
  });
  // "Modul IV" / "Modul III" / "Modul II" / "Modul I"
  out = out.replace(/\bModul (IV|III|II|I)\b/g, (match, roman) => {
    const sectionId = MODUL_TO_SECTION[roman];
    if (!sectionId) return match;
    const target = firstLessonOfSection(sectionId);
    return target ? `[${match}](lesson:${target})` : match;
  });
  return out;
}

// ============================================================
// Search
// ============================================================

type MatchedField = "title" | "hook" | "lernziel" | "takeaway" | "script";

type SearchHit = {
  lesson: Lesson;
  section: Section;
  field: MatchedField;
  snippet: string;
};

const FIELD_LABEL: Record<MatchedField, string> = {
  title: "Titel",
  hook: "Hook",
  lernziel: "Lernziel",
  takeaway: "Take-away",
  script: "Skript",
};

function buildSnippet(text: string, query: string): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, 120);
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + query.length + 100);
  let snippet = text.slice(start, end).replace(/\s+/g, " ").trim();
  if (start > 0) snippet = "… " + snippet;
  if (end < text.length) snippet = snippet + " …";
  return snippet;
}

function searchLessons(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];
  for (const section of courseContent) {
    for (const lesson of section.lessons) {
      const fields: { field: MatchedField; text: string | undefined }[] = [
        { field: "title", text: lesson.title },
        { field: "takeaway", text: lesson.takeaway },
        { field: "lernziel", text: lesson.lernziel },
        { field: "hook", text: lesson.hook },
        { field: "script", text: courseScripts[lesson.id] },
      ];
      for (const { field, text } of fields) {
        if (!text) continue;
        if (!text.toLowerCase().includes(q)) continue;
        hits.push({
          lesson,
          section,
          field,
          snippet: field === "title" ? lesson.title : buildSnippet(text, q),
        });
        break; // first match per lesson
      }
    }
  }
  return hits;
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const q = query.toLowerCase();
  const lower = text.toLowerCase();
  const parts: React.ReactNode[] = [];
  let i = 0;
  let safety = 0;
  while (i < text.length && safety < 500) {
    safety++;
    const idx = lower.indexOf(q, i);
    if (idx === -1) {
      parts.push(<span key={`t-${i}`}>{text.slice(i)}</span>);
      break;
    }
    if (idx > i) parts.push(<span key={`t-${i}`}>{text.slice(i, idx)}</span>);
    parts.push(
      <mark
        key={`m-${idx}`}
        className="rounded bg-purple-light-4 px-0.5 text-text-primary"
      >
        {text.slice(idx, idx + q.length)}
      </mark>,
    );
    i = idx + q.length;
  }
  return <>{parts}</>;
}

function SearchOverlay({
  onClose,
  onSelectLesson,
}: {
  onClose: () => void;
  onSelectLesson: (id: string) => void;
}) {
  const [query, setQuery] = useState("");

  // Close on ESC.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const hits = useMemo(() => searchLessons(query), [query]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Suche im Kurs"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border-secondary px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-text-tertiary" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche in Titeln, Take-aways, Skripten …"
            className="flex-1 bg-transparent text-base text-text-primary outline-none placeholder:text-text-tertiary"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Suche schließen"
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-tertiary transition hover:bg-background-secondary hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            <div className="px-5 py-10 text-center text-sm text-text-tertiary">
              Tippe mindestens 2 Zeichen, um zu suchen.
            </div>
          ) : hits.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-text-tertiary">
              Keine Treffer für „{query}".
            </div>
          ) : (
            <>
              <div className="border-b border-border-secondary bg-background-secondary px-5 py-2 text-xs text-text-tertiary">
                {hits.length} {hits.length === 1 ? "Treffer" : "Treffer"}
              </div>
              <ul className="divide-y divide-border-secondary">
                {hits.map((hit) => (
                  <li key={hit.lesson.id}>
                    <button
                      type="button"
                      onClick={() => onSelectLesson(hit.lesson.id)}
                      className="block w-full px-5 py-3 text-left transition hover:bg-purple-light-5"
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold uppercase tracking-wider text-purple">
                          {hit.section.title.replace(/^Sektion \d+ – /, "")}
                        </span>
                        <span className="text-text-tertiary">·</span>
                        <span className="text-text-tertiary">
                          {FIELD_LABEL[hit.field]}
                        </span>
                      </div>
                      <div className="mt-1 text-sm font-semibold leading-snug text-text-primary">
                        <Highlight text={hit.lesson.title} query={query} />
                      </div>
                      {hit.field !== "title" && (
                        <div className="mt-1 text-sm leading-relaxed text-text-secondary">
                          <Highlight text={hit.snippet} query={query} />
                        </div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="border-t border-border-secondary bg-background-secondary px-5 py-2 text-xs text-text-tertiary">
          <kbd className="rounded border border-border-secondary bg-white px-1.5 py-0.5 font-mono">
            Esc
          </kbd>{" "}
          schließen
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Notes overview modal
// ============================================================

function NotesOverviewModal({
  notes,
  onClose,
  onSelectLesson,
}: {
  notes: Record<string, string>;
  onClose: () => void;
  onSelectLesson: (id: string) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Group notes by section in course order.
  const grouped = useMemo(() => {
    const out: { section: Section; entries: { lesson: Lesson; note: string }[] }[] = [];
    for (const section of courseContent) {
      const entries: { lesson: Lesson; note: string }[] = [];
      for (const lesson of section.lessons) {
        const note = notes[lesson.id]?.trim();
        if (note) entries.push({ lesson, note: notes[lesson.id] });
      }
      if (entries.length > 0) out.push({ section, entries });
    }
    return out;
  }, [notes]);

  const totalNotes = grouped.reduce((acc, g) => acc + g.entries.length, 0);

  const exportAsMarkdown = () => {
    const lines: string[] = [`# Meine Notizen — DeepDiveKI Komplettkurs`, ""];
    for (const { section, entries } of grouped) {
      lines.push(`## ${section.title}`, "");
      for (const { lesson, note } of entries) {
        lines.push(`### ${lesson.title}`, "", note.trim(), "");
      }
    }
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "deepdiveki-notizen.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Alle Notizen"
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border-secondary px-5 py-4">
          <Notebook className="h-5 w-5 shrink-0 text-purple" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-text-primary">
              Meine Notizen
            </h2>
            <p className="text-xs text-text-tertiary">
              {totalNotes === 0
                ? "Noch keine Notizen"
                : `${totalNotes} ${totalNotes === 1 ? "Notiz" : "Notizen"} aus ${grouped.length} Sektion${grouped.length === 1 ? "" : "en"}`}
            </p>
          </div>
          {totalNotes > 0 && (
            <button
              type="button"
              onClick={exportAsMarkdown}
              className="flex items-center gap-1.5 rounded-lg border border-border-secondary px-3 py-1.5 text-xs font-semibold text-text-primary transition hover:bg-background-secondary"
              title="Als Markdown-Datei herunterladen"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-tertiary transition hover:bg-background-secondary hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto">
          {totalNotes === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-text-tertiary">
              Du hast noch keine Notizen geschrieben. Öffne eine Lektion und
              wechsle in den Reiter „Notizen", um anzufangen.
            </div>
          ) : (
            <ul className="divide-y divide-border-secondary">
              {grouped.map(({ section, entries }) => (
                <li key={section.id} className="px-5 py-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple">
                    {section.title}
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {entries.map(({ lesson, note }) => (
                      <li
                        key={lesson.id}
                        className="rounded-xl border border-border-secondary bg-background-secondary p-3"
                      >
                        <button
                          type="button"
                          onClick={() => onSelectLesson(lesson.id)}
                          className="text-sm font-semibold text-text-primary hover:text-purple hover:underline"
                        >
                          {lesson.title}
                        </button>
                        <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
                          {note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border-secondary bg-background-secondary px-5 py-2 text-xs text-text-tertiary">
          <kbd className="rounded border border-border-secondary bg-white px-1.5 py-0.5 font-mono">
            Esc
          </kbd>{" "}
          schließen
        </div>
      </div>
    </div>
  );
}
