export const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-y-4 bg-slate-100 p-4">
			{children}
		</div>
	);
};
