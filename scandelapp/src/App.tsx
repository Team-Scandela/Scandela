import { useState, useEffect } from 'react';
import './translation/translation';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';
import Redirect from './pages/redirect';
import Admin from './pages/admin';
import LoadingPage from './pages/loadingpages';
import LawPage from './pages/law';
import Statistics from './pages/statistics';
import ResetPwd from './pages/resetpwd';
import HomePage from './pages/homepage';
import ToDo from './pages/todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getLampPrice } from './utils/actionsPriceUtils';
import PrivateRoute from './components/PrivateRoute/privateRoute';

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
                    {/* Route publique pour la page de login */}
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
                    {/* Toutes les autres routes sont privées ici donc protégé tant que le token n'est pas dans le localstorage */}
                    <Route
                        path="/loadingpage"
                        element={
                            <PrivateRoute>
                                <LoadingPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/homepage"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/scandela"
                        element={
                            <PrivateRoute>
                                <Main
                                    optimisationTemplateData={
                                        optimisationTemplateData
                                    }
                                    setOptimisationTemplateData={
                                        setOptimisationTemplateData
                                    }
                                />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/redirect"
                        element={
                            <PrivateRoute>
                                <Redirect />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <Admin />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/laws"
                        element={
                            <PrivateRoute>
                                <LawPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/statistics"
                        element={
                            <PrivateRoute>
                                <Statistics />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/todo/:key"
                        element={
                            <PrivateRoute>
                                <ToDo />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/resetpwd/:uuid"
                        element={
                            <PrivateRoute>
                                <ResetPwd />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
