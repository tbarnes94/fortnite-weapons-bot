export interface IWeaponOne {
    image: string;
    name: {
        text: string;
        url: string;
        rarity: string;
    };
    quick: {
        damage: string;
        criticalHitChance: string;
        criticalHitDamage: string;
        fireRate: string;
        magazineSize: string;
        range: string;
        durability: string;
        reloadTime: string;
        ammoCost: string;
        impact: string;
    };
    spread: {
        base: string;
        downsights: string;
        sprinting: string;
        jumpFall: string;
        standingStill: string;
        crouching: string;
    };
    firingRate: {
        normal: string;
        burst: string;
    };
    range: {
        pb: string;
        mid: string;
        long: string;
        max: string;
    };
    damage: {
        pbRange: string;
        midRange: string;
        longRange: string;
        maxRange: string;
    };
    envDamage: {
        pbRange: string;
        midRange: string;
        longRange: string;
        maxRange: string;
    };
    impactDamage: {
        pbRange: string;
        midRange: string;
        longRange: string;
        maxRange: string;
    };
    recoil: {
        horizontal: string;
        horizontalGamepad: string;
        vertical: string;
        verticalGamepad: string;
        angleMax: string;
        angleMin: string;
        downsights: string;
        interpSpeed: string;
        interpSpeedRecovery: string;
    };
    lootProbability: {
        floorLootWarmup: {
            title: {
                text: string;
                url: string;
            };
            weaponName: string;
            chance: string;
            realChance: string;
        };
        floorLoot: {
            title: {
                text: string;
                url: string;
            };
            weaponName: string;
            chance: string;
            realChance: string;
        }
        chest: {
            title: {
                text: string;
                url: string;
            };
            weaponName: string;
            chance: string;
            realChance: string;
        }
        supplyDrop: {
            title: {
                text: string;
                url: string;
            };
            weaponName: string;
            chance: string;
            realChance: string;
        }
    };
}
