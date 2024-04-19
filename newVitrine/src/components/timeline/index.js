import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Yellow, White } from '../../colors';
import { TimelineContainer } from './elements';

const Timeline = () => {
    return (
        <TimelineContainer>
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    // contentStyle={{ background: Yellow, color: White }}
                    // contentArrowStyle={{ borderRight: '7px solid' +  Yellow }}
                    date="Octobre - Décembre 2024"
                    iconStyle={{ background: Yellow, color: White }}
                >
                    <h3 className="vertical-timeline-element-title">Launch & Metrics</h3>
                    <p>
                        Lancement du projet, mise en place des outils nécessaires au suivi d'un projet en production
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="Juin - Septembre 2024"
                    iconStyle={{ background: Yellow, color: White }}
                >
                    <h3 className="vertical-timeline-element-title">Consolidation</h3>
                    <p>
                        Ecouter les retours et faire les modifications nécessaires pour améliorer l'expérience utilisateur
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: Yellow, color: White }}
                    contentArrowStyle={{ borderRight: '7px solid' +  Yellow }}
                    date="Février - Mai 2024"
                    // how to change the style of the date text ?
                    iconStyle={{ background: Yellow, color: White }}
                >
                    <h3 className="vertical-timeline-element-title">Beta</h3>
                    <p>
                        Mise en place de la version beta du projet pour recueillir les premiers retours des utilisateurs
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="Octobre 2023 - Janvier 2024"
                    iconStyle={{ background: Yellow, color: White }}
                >
                    <h3 className="vertical-timeline-element-title">Fast Forward</h3>
                    <p>
                        Avancée rapide sur le projet pour atteindre les objectifs fixés dans le developpement du projet
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="Juin - Octobre 2023"
                    iconStyle={{ background: Yellow, color: White }}
                >
                    <h3 className="vertical-timeline-element-title">Management & Process</h3>
                    <p>
                        Structure et pérenniser l'organisation au sein du groupe et de la gestion du projet
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="Avril - Juin 2023"
                    iconStyle={{ background: Yellow, color: White }}
                >
                    <h3 className="vertical-timeline-element-title">Test & Learn</h3>
                    <p>
                        Période de test, méthodes d'organisations internes, et moyens de communications
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="Décembre 2022"
                    iconStyle={{ background: Yellow, color: White }}
                >
                    <h3 className="vertical-timeline-element-title">Pisicne Forward</h3>
                    <p>
                        Elaboration d'un plan de recherche sur les besoins des utilisateurs et les solutions à apporter, les concuurent sur le marché, développement du buisness plan et création d'un premier MVP
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="Septembre 2022"
                    iconStyle={{ background: Yellow, color: White }}
                >
                    <h3 className="vertical-timeline-element-title">Pisicne Moonshot</h3>
                    <p>
                        Création et imagination du projet, recherche de solutions innovantes et de valeur ajoutée
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </TimelineContainer>

    );
}

export default Timeline;