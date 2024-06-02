import { useState, useEffect } from 'react';
import './translation/translation';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import LandingPage from './pages/landingpage';
import Redirect from './pages/redirect';
import LoadingPage from './components/LoadingPage';
import Admin from './pages/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/** Route page */
const App: React.FC = () => {
    const [optimisationTemplateData, setOptimisationTemplateData] = useState(
        () => {
            const savedData = localStorage.getItem('optimisationTemplateData');
            return savedData ? JSON.parse(savedData) : [];
        }
    );

    useEffect(() => {
        localStorage.setItem(
            'optimisationTemplateData',
            JSON.stringify(optimisationTemplateData)
        );
    }, [optimisationTemplateData]);

    const addItemToOptimisationTemplate = (data: any) => {
        const newItems = data.map((item: any, index: number) => {
            let prix = 0; // Prix par défaut
    
            // Logique pour déterminer le prix en fonction de la solution
            if (item.solution.includes("Changer")) {
                prix = 30;
            } else if (item.solution.includes("Allumer")) {
                prix = 100;
            } else if (item.solution.includes("Éteindre")) {
                prix = -100;
            } else if (item.solution.includes("Ajouter") || item.solution.includes("Retirer")) {
                prix = 180;
            } else if (item.solution.includes("Augmenter")) {
                prix = 50;
            } else if (item.solution.includes("Réduire")) {
                prix = -50;
            }

            console.log('prix :', prix);
    
            return {
                id: index,
                saved: false,
                selected: false,
                name: item.lampDecision.lamp.name,
                type: item.type.title,
                location: item.location,
                description: item.description,
                solution: item.solution,
                lampType: item.lampDecision.lamp.lampType,
                foyerType: item.lampDecision.lamp.foyerType,
                height: item.lampDecision.lamp.height,
                uuid: item.id,
                validate: item.validate,
                price: prix // Ajout de la propriété price
            };
        });
        setOptimisationTemplateData(newItems);
    };

    return (
        <div>
            <Helmet>
                <title>Scandela</title>
                <meta
                    name="description"
                    content="Scandela est une application d'aide à la gestion et à la maintenance de l'éclairage public."
                />
                <meta
                    name="keywords"
                    content="Scandela, éclairage, gestion, maintenance, éclairage public, éclairage urbain, éclairage intelligent, smart city, smart lighting, aide"
                />
                <meta name="author" content="Scandela" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Helmet>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Login
                                setOptimisationTemplateData={
                                    setOptimisationTemplateData
                                }
                                addItemToOptimisationTemplate={
                                    addItemToOptimisationTemplate
                                }
                            />
                        }
                    />
                    <Route path="/landingpage" element={<LandingPage />} />
                    <Route
                        path="/scandela"
                        element={
                            <Main
                                optimisationTemplateData={
                                    optimisationTemplateData
                                }
                                setOptimisationTemplateData={
                                    setOptimisationTemplateData
                                }
                            />
                        }
                    />
                    <Route path="/redirect" element={<Redirect />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
