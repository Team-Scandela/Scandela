import { useState, useEffect } from 'react';
import './translation/translation';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import LandingPage from './pages/landingpage';
import Redirect from './pages/redirect';
import Admin from './pages/admin';
import LoadingPage from './pages/loadingpages';
import LawPage from './pages/law';
import Statistics from './pages/statistics';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getLampPrice } from './utils/actionsPriceUtils';

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

    const addItemToOptimisationTemplate = async (data: any) => {
        const newItems = await Promise.all(
            data.map(async (item: any, index: number) => {
                let prix = '0'; // Prix par défaut

                // Logique pour déterminer le prix en fonction de la solution
                if (item.solution.includes('Changer')) {
                    prix = '30';
                } else if (item.solution.includes('Allumer')) {
                    prix = await getLampPrice(item.lampDecision.lamp.lampType);
                    const price = parseFloat(prix) * 8;
                    prix = price.toString();
                } else if (item.solution.includes('Éteindre')) {
                    prix = '-100';
                } else if (
                    item.solution.includes('Ajouter') ||
                    item.solution.includes('Retirer')
                ) {
                    prix = '1000';
                } else if (item.solution.includes('Augmenter')) {
                    prix = '150';
                } else if (item.solution.includes('Réduire')) {
                    prix = '-150';
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
                    price: parseFloat(prix), // Ajout de la propriété price
                };
            })
        );

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
                    <Route path="/loadingpage" element={<LoadingPage />} />
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
                    <Route path="/laws" element={<LawPage />} />
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
