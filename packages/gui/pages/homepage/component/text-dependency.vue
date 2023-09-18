<template>
    <div class="container">
        <div class="title">{{ levelTitle }}</div>
        <div class="package-list">
            <table>
                <tbody>
                    <template v-for="item of packageList">
                        <tr class="package-item">
                            <td class="package-name">{{ item.name }}</td>
                            <td class="package-version">{{ item.version }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>

const { levelTitle, packageList } = defineProps<{
    levelTitle: string,
    packageList: {
        name: string,
        version: string
    }[]
}>()

</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 240px;
    max-height: 80vh;
    overflow: scroll;


    .package-item {
        border: 1px solid #841111;
    }

    .package-name {
        width: 200px;
        white-space: break-spaces;
        word-break: break-all;
        border-left: 1px solid #ccc;

    }

}
</style>