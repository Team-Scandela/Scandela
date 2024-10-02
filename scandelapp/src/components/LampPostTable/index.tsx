import React from 'react';
import {
    TableContainer,
    StyledTable,
    TableHeader,
    TableRow,
    TableCell,
} from './elements';

const LampPostTable = ({ lampPosts }: { lampPosts: Array<any> }) => {
    return (
        <TableContainer>
            <StyledTable>
                <thead>
                    <TableRow>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Last Maintenance</TableHeader>
                        <TableHeader>Maintenance Cost</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {lampPosts.map((lampPost, index) => (
                        <TableRow key={index}>
                            <TableCell>{lampPost.id}</TableCell>
                            <TableCell>{lampPost.type}</TableCell>
                            <TableCell>{lampPost.status}</TableCell>
                            <TableCell>{lampPost.lastMaintenance}</TableCell>
                            <TableCell>{lampPost.maintenanceCost} €</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};

export default LampPostTable;
