import { Clock, Download } from 'lucide-react';

export default function EmploisDuTemps() {
  const [selectedClasse, setSelectedClasse] = useState('CM2-A');
  const [selectedJour, setSelectedJour] = useState(0);

  const classes = ['CM2-A', 'CM1-A', 'CE2-A', '5ème-A', '4ème-A', '3ème-A'];
  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const heures = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

  const emploiDuTemps = {
    'CM2-A': {
      'Lundi': [
        { matiere: 'Mathématiques', enseignant: 'Ahmed Benali', heure: '08:00-09:00' },
        { matiere: 'Français', enseignant: 'Mohammed Tazi', heure: '09:00-10:00' },
        { matiere: 'Arabe', enseignant: 'Mohammed Tazi', heure: '10:00-11:00' },
        { matiere: 'Pause', enseignant: '', heure: '11:00-11:30' },
        { matiere: 'Anglais', enseignant: 'Khadija Benjelloun', heure: '11:30-12:30' },
        { matiere: 'Informatique', enseignant: 'Youssef Cherkaoui', heure: '14:00-15:00' },
        { matiere: 'Sport', enseignant: 'Khalid Ouahhabi', heure: '15:00-16:00' },
        null
      ],
      'Mardi': [
        { matiere: 'SVT', enseignant: 'Samira Fadili', heure: '08:00-09:00' },
        { matiere: 'Mathématiques', enseignant: 'Ahmed Benali', heure: '09:00-10:00' },
        { matiere: 'Français', enseignant: 'Mohammed Tazi', heure: '10:00-11:00' },
        { matiere: 'Pause', enseignant: '', heure: '11:00-11:30' },
        { matiere: 'Histoire-Géo', enseignant: 'Hicham Ouahhabi', heure: '11:30-12:30' },
        { matiere: 'Éducation Islamique', enseignant: 'Nadia Belhaj', heure: '14:00-15:00' },
        { matiere: 'Dessin', enseignant: '---', heure: '15:00-16:00' },
        null
      ],
      'Mercredi': [
        { matiere: 'Mathématiques', enseignant: 'Ahmed Benali', heure: '08:00-09:00' },
        { matiere: 'Français', enseignant: 'Mohammed Tazi', heure: '09:00-10:00' },
        { matiere: 'Anglais', enseignant: 'Khadija Benjelloun', heure: '10:00-11:00' },
        { matiere: 'Pause', enseignant: '', heure: '11:00-11:30' },
        { matiere: 'Arabe', enseignant: 'Mohammed Tazi', heure: '11:30-12:30' },
        { matiere: 'Sport', enseignant: 'Khalid Ouahhabi', heure: '14:00-15:00' },
        null, null
      ],
      'Jeudi': [
        { matiere: 'Physique', enseignant: 'Fatima El Amrani', heure: '08:00-09:00' },
        { matiere: 'Mathématiques', enseignant: 'Ahmed Benali', heure: '09:00-10:00' },
        { matiere: 'Français', enseignant: 'Mohammed Tazi', heure: '10:00-11:00' },
        { matiere: 'Pause', enseignant: '', heure: '11:00-11:30' },
        { matiere: 'SVT', enseignant: 'Samira Fadili', heure: '11:30-12:30' },
        { matiere: 'Informatique', enseignant: 'Youssef Cherkaoui', heure: '14:00-15:00' },
        { matiere: 'Éducation Islamique', enseignant: 'Nadia Belhaj', heure: '15:00-16:00' },
        null
      ],
      'Vendredi': [
        { matiere: 'Mathématiques', enseignant: 'Ahmed Benali', heure: '08:00-09:00' },
        { matiere: 'Arabe', enseignant: 'Mohammed Tazi', heure: '09:00-10:00' },
        { matiere: 'Histoire-Géo', enseignant: 'Hicham Ouahhabi', heure: '10:00-11:00' },
        { matiere: 'Pause', enseignant: '', heure: '11:00-11:30' },
        { matiere: 'Anglais', enseignant: 'Khadija Benjelloun', heure: '11:30-12:30' },
        null, null, null
      ],
      'Samedi': [
        { matiere: 'Français', enseignant: 'Mohammed Tazi', heure: '08:00-09:00' },
        { matiere: 'Mathématiques', enseignant: 'Ahmed Benali', heure: '09:00-10:00' },
        null, null, null, null, null, null
      ]
    }
  };

  const schedule = emploiDuTemps[selectedClasse]?.[jours[selectedJour]] || [];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Emplois du Temps</h1>
          <p className="page-subtitle">Planning hebdomadaire</p>
        </div>
        <button className="btn btn-secondary">
          <Download size={18} />
          Exporter PDF
        </button>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <label>Classe:</label>
          <select className="filter-select" value={selectedClasse} onChange={(e) => setSelectedClasse(e.target.value)}>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="kanban-board" style={{ overflowX: 'auto' }}>
        <div className="schedule-grid" style={{ minWidth: '800px' }}>
          <div className="schedule-header" style={{ background: 'var(--bg)', color: 'var(--text)' }}>Horaire</div>
          {jours.map((jour, idx) => (
            <div 
              key={jour} 
              className="schedule-header"
              style={{ cursor: 'pointer', opacity: idx === selectedJour ? 1 : 0.7 }}
              onClick={() => setSelectedJour(idx)}
            >
              {jour}
            </div>
          ))}

          {heures.map((heure, hIdx) => (
            <>
              <div key={`time-${hIdx}`} className="schedule-time">{heure}</div>
              {jours.map((jour, jIdx) => {
                const cellData = emploiDuTemps[selectedClasse]?.[jour]?.[hIdx];
                return (
                  <div key={`${jour}-${hIdx}`} className="schedule-cell" style={{ 
                    background: cellData?.matiere === 'Pause' ? 'var(--bg)' : 
                    cellData ? 'var(--primary)' : 'transparent',
                    border: jIdx === selectedJour ? '2px solid var(--accent)' : 'none'
                  }}>
                    {cellData && cellData.matiere !== 'Pause' && (
                      <>
                        <div className="course">{cellData.matiere}</div>
                        <div className="teacher">{cellData.enseignant}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div className="chart-card" style={{ marginTop: '20px' }}>
        <h3 className="chart-title">Vue détaillée - {jours[selectedJour]}</h3>
        <div className="event-list">
          {schedule.filter(c => c && c.matiere !== 'Pause').map((course, idx) => (
            <div key={idx} className="event-item">
              <div style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '8px 12px', 
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.85rem'
              }}>
                {course.heure}
              </div>
              <div className="event-info">
                <h4>{course.matiere}</h4>
                <p>{course.enseignant}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
