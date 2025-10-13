export default function AILoadingAnim() {
    return (
       <div className="self-start flex items-center gap-2 mt-4">
            <img src="/ai_logo.svg" alt="AI" className="w-10 h-10" />
            <div className="animate-pulse text-heading-2 text-lg px-6 py-4 rounded-xl bg-box-bg">
                <span className="inline-block">Thinking</span>
                <span className="animate-bounce inline-block">.</span>
                <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="animate-bounce inline-block" style={{ animationDelay: '0.4s' }}>.</span>
            </div>
        </div> 
    );
};
