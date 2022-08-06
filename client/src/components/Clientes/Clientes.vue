<template>
    <div class="content">
        <h2 class="titulo">Lista de Clientes</h2>
        <div class="buttonDiv">
            <button class="addClients">Adicionar Clientes</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="whitespace-nowrap">Nome</th>
                    <th class="whitespace-nowrap">CPF/CNPJ</th>
                    <th class="text-center whitespace-nowrap">Ações</th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>

</script>
<style lang="scss">
    .titulo {
        font-size: 24px;
        color: #000;
        text-align: left;
    }
    .buttonDiv {
        width: 100%;
        display: flex;
        justify-content: left;
        .addClients {
            display: inline-flex;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            border-radius: .375rem;
            border-width: 1px;
            padding: .5rem .75rem;
            font-weight: 500;
            background: var(--primary);
            color: #fff;
        }
    }
</style>