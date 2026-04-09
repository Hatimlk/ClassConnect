import { useState } from 'react';
import { Calendar, Plus, MapPin, Clock } from 'lucide-react';
import { evenements as allEvenements } from '../../data/mockData';
import Modal from '../Modal';

export default function Agenda() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dateStr = `${String(day).padStart(2, '0')}/${month}/${currentMonth.getFullYear()}`;
    return allEvenements.filter(e => e.date === dateStr);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Agenda & Événements</h1>
          <p className="page-subtitle">Calendrier scolaire</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Nouvel événement
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handlePrevMonth}>←</button>
            <h3 className="chart-title">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
            <button className="btn btn-secondary btn-sm" onClick={handleNextMonth}>→</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
              <div key={day} style={{ 
                textAlign: 'center', 
                padding: '8px', 
                fontWeight: '600', 
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}>
                {day}
              </div>
            ))}
            
            {days.map((day, idx) => {
              const events = day ? getEventsForDay(day) : [];
              const isToday = day === new Date().getDate() && 
                             currentMonth.getMonth() === new Date().getMonth() &&
                             currentMonth.getFullYear() === new Date().getFullYear();
              
              return (
                <div 
                  key={idx} 
                  style={{ 
                    minHeight: '80px',
                    padding: '8px',
                    borderRadius: '8px',
                    background: isToday ? 'rgba(30, 58, 95, 0.1)' : 'var(--bg)',
                    border: isToday ? '2px solid var(--primary)' : '1px solid var(--border)'
                  }}
                >
                  {day && (
                    <>
                      <div style={{ 
                        fontWeight: isToday ? '700' : '500',
                        color: isToday ? 'var(--primary)' : 'var(--text)',
                        marginBottom: '4px'
                      }}>
                        {day}
                      </div>
                      {events.slice(0, 2).map((event, eIdx) => (
                        <div 
                          key={eIdx}
                          onClick={() => handleEventClick(event)}
                          style={{ 
                            fontSize: '0.7rem',
                            padding: '2px 4px',
                            marginBottom: '2px',
                            borderRadius: '4px',
                            background: event.type === 'Examen' ? 'var(--danger)' : 
                                       event.type === 'Réunion' ? 'var(--accent)' : 'var(--primary)',
                            color: 'white',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {event.titre.substring(0, 15)}...
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          +{events.length - 2} autres
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="widget-card">
          <h3 className="widget-title">
            <Calendar size={18} />
            Événements à venir
          </h3>
          <div className="event-list">
            {allEvenements.map((event, index) => {
              const [day, month] = event.date.split('/');
              return (
                <div 
                  key={index} 
                  className="event-item" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="event-date">
                    <div className="day">{day}</div>
                    <div className="month">{['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'][parseInt(month) - 1]}</div>
                  </div>
                  <div className="event-info">
                    <h4>{event.titre}</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {event.heure}
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {event.lieu}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal title="Nouvel événement" onClose={() => setShowModal(false)}>
          <p>Formulaire de création d'événement...</p>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </Modal>
      )}

      {selectedEvent && (
        <Modal title={selectedEvent.titre} onClose={() => setSelectedEvent(null)}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Calendar size={18} color="var(--text-secondary)" />
              <span>{selectedEvent.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Clock size={18} color="var(--text-secondary)" />
              <span>{selectedEvent.heure}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="var(--text-secondary)" />
              <span>{selectedEvent.lieu}</span>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setSelectedEvent(null)}>Fermer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
