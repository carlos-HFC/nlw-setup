interface ProgressBarProps {
  progress: number;
}

export function ProgressBar(props: Readonly<ProgressBarProps>) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 mt-4 w-full">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={props.progress}
        className="h-3 rounded-xl bg-violet-600"
        style={{
          width: `${props.progress}%`
        }}
      />
    </div>
  );
}