const PersonalStats = () => {
  return (
    <section className="py-16 bg-motor-gray border-y border-white/5">
      <div className="max-w-6xl w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center fade-in-section">
          <div>
            <div
              className="text-3xl font-display text-white mb-1"
              id="hours-worked"
            >
              47
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Hours Worked
            </div>
          </div>
          <div>
            <div className="text-3xl font-display text-white mb-1">12</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Parts Ordered
            </div>
          </div>
          <div>
            <div className="text-3xl font-display text-white mb-1">3</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Seized Bolts
            </div>
          </div>
          <div>
            <div className="text-3xl font-display text-gold mb-1">0</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Coffee Breaks
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalStats;
