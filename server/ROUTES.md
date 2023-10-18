# Scandela Server Routes

<details>
    <summary><b>Decision</b> (Throw: <b>DecisionException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/decisions</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>type: </b>DecisionType,
                <b>description: </b>string,
                <b>validate: </b>bool,
                <b>date: </b>LocalDate,
                <b>cost: </b>long,
                <b>benefits: </b>[long]
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/decisions/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>type: </b>DecisionType,
            <b>description: </b>string,
            <b>validate: </b>bool,
            <b>date: </b>LocalDate,
            <b>cost: </b>long,
            <b>benefits: </b>[long]
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/decisions/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>type: </b>{ id: int },
            <b>user: </b>{ id: int },
            <b>description: </b>string,
            <b>validate: </b>bool,
            <b>cost: </b>long,
            <b>benefits: </b>[long]
        }</code>
                </li>
                <li><b>Return: </b>Same as Decision::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/decisions/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>

<details>
    <summary><b>DecisionType</b> (Throw: <b>DecisionTypeException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/decisionTypes</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>title: </b>string,
                <b>moreInformations: </b>[string]
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/decisionTypes/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>title: </b>string,
            <b>moreInformations: </b>[string]
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/decisionTypes/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>title: </b>string,
            <b>moreInformations: </b>[string]
        }</code>
                </li>
                <li><b>Return: </b>Same as DecisionType::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/decisionTypes/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>

<details>
    <summary><b>Hood</b> (Throw: <b>HoodException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/hoods</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>streets: </b>[Street],
                <b>name: </b>string,
                <b>latitude: </b>double,
                <b>longitude: </b>double
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/hoods/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>streets: </b>[Street],
            <b>name: </b>string,
            <b>latitude: </b>double,
            <b>longitude: </b>double
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/hoods/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>town: </b>{ id: int },
            <b>name: </b>string,
            <b>latitude: </b>double,
            <b>longitude: </b>double
        }</code>
                </li>
                <li><b>Return: </b>Same as Hood::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/hoods/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>

<details>
    <summary><b>Incident</b> (Throw: <b>IncidentException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/incidents</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>name: </b>string,
                <b>description: </b>string,
                <b>impactElectricity: </b>float,
                <b>impactEcology: </b>float,
                <b>impactQuality: </b>float
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/incidents/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>name: </b>string,
            <b>description: </b>string,
            <b>impactElectricity: </b>float,
            <b>impactEcology: </b>float,
            <b>impactQuality: </b>float
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/incidents/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>town: </b>{ id: int },
            <b>name: </b>string,
            <b>description: </b>string,
            <b>impactElectricity: </b>float,
            <b>impactEcology: </b>float,
            <b>impactQuality: </b>float
        }</code>
                </li>
                <li><b>Return: </b>Same as Incident::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/incidents/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>

<details>
    <summary><b>LampDecision</b> (Throw: <b>LampDecisionException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/lampDecisions</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>decision: </b>Decision
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/lampDecisions/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>decision: </b>Decision
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/lampDecisions/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>decision: </b>{ id: int }
        }</code>
                </li>
                <li><b>Return: </b>Same as LampDecision::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/lampDecisions/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>

<details>
    <summary><b>LampIncident</b> (Throw: <b>LampIncidentException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/lampIncidents</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>incident: </b>Incident
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/lampIncidents/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>incident: </b>Incident
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/lampIncidents/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>incident: </b>{ id: int }
        }</code>
                </li>
                <li><b>Return: </b>Same as LampIncident::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/lampIncidents/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>

<details>
    <summary><b>Street</b> (Throw: <b>StreetException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/streets</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>address: </b>[string]
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/streets/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>address: </b>[string]
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/streets/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>hood: </b>{ id: int },
            <b>address: </b>[string]
        }</code>
                </li>
                <li><b>Return: </b>Same as Street::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/streets/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>

<details>
    <summary><b>Town</b> (Throw: <b>TownException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/towns</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>hoods: </b>[Hood],
                <b>name: </b>string,
                <b>latitude: </b>double,
                <b>longitude: </b>double,
                <b>electricityPrice: </b>int,
                <b>indiceElectricity: </b>float,
                <b>indiceEcology: </b>float,
                <b>indiceQuality: </b>float,
                <b>incidents: </b>[Incident]
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/towns/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>hoods: </b>[Hood],
            <b>name: </b>string,
            <b>latitude: </b>double,
            <b>longitude: </b>double,
            <b>electricityPrice: </b>int,
            <b>indiceElectricity: </b>float,
            <b>indiceEcology: </b>float,
            <b>indiceQuality: </b>float,
            <b>incidents: </b>[Incident]
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/towns/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>name: </b>string,
            <b>latitude: </b>double,
            <b>longitude: </b>double,
            <b>electricityPrice: </b>int,
            <b>indiceElectricity: </b>float,
            <b>indiceEcology: </b>float,
            <b>indiceQuality: </b>float
        }</code>
                </li>
                <li><b>Return: </b>Same as Town::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/towns/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>

<details>
    <summary><b>User</b> (Throw: <b>UserException</b>)</summary>
    <ul>
        <details>
            <summary>Get all</summary>
            <ul>
                <li><b>Route: </b>/users</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        [
            {
                <b>id: </b>int,
                <b>town: </b>Town,
                <b>email: </b>string,
                <b>username: </b>string,
                <b>password: </b>string,
                <b>role: </b>string,
                <b>moreInformations: </b>[string],
                <b>darkmode: </b>bool,
                <b>lastConnexion: </b>LocalDateTime,
                <b>decisions: </b>[Decision]
            },
            { ... }
        ]</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Get one by id</summary>
            <ul>
                <li><b>Route: </b>/users/{id}</li>
                <li><b>Method: </b>GET</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b>
        <code>
        {
            <b>id: </b>int,
            <b>town: </b>Town,
            <b>email: </b>string,
            <b>username: </b>string,
            <b>password: </b>string,
            <b>role: </b>string,
            <b>moreInformations: </b>[string],
            <b>darkmode: </b>bool,
            <b>lastConnexion: </b>LocalDateTime,
            <b>decisions: </b>[Decision]
        }</code>
                </li>
            </ul>
        </details>
        <details>
            <summary>Create</summary>
            <ul>
                <li><b>Route: </b>/users/create</li>
                <li><b>Method: </b>POST</li>
                <li><b>Parameters: </b>
        <code>
        {
            <b>town: </b>{ id: int },
            <b>email: </b>string,
            <b>username: </b>string,
            <b>password: </b>string,
            <b>role: </b>string,
            <b>moreInformations: </b>[string],
        }</code>
                </li>
                <li><b>Return: </b>Same as User::Get one by id</li>
            </ul>
        </details>
        <details>
            <summary>Delete by id</summary>
            <ul>
                <li><b>Route: </b>/users/delete/{id}</li>
                <li><b>Method: </b>DELETE</li>
                <li><b>Parameters: </b> - </li>
                <li><b>Return: </b> - </li>
            </ul>
        </details>
    </ul>
</details>
